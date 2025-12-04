// src/helpers/mailer.ts
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const isTesting = process.env.MAILTRAP_MODE === "testing";
const testRecipient = process.env.MAILTRAP_TEST_RECIPIENT;

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport(
      MailtrapTransport({ token: process.env.MAILTRAP_TOKEN! })
    );

    // If in testing mode, force recipient to the account/test address
    const recipientAddress = isTesting && testRecipient ? testRecipient : email;

    await transporter.sendMail({
      from: { address: "hello@demomailtrap.co", name: "Auth App" },
      to: { address: recipientAddress, name: "User" },
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verify-email" : "reset-password"
      }?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
      `,
    });

    return { success: true, token }; // returning token can help local testing
  } catch (err: any) {
    console.error("Email error:", err);
    throw new Error(err.message);
  }
};
