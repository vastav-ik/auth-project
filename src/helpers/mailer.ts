// src/helpers/mailer.ts
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

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
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Update user token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_TOKEN!, // From .env
      })
    );

    const sender = {
      address: "hello@demomailtrap.co",
      name: "Auth App",
    };

    const recipients = {
      address: "testing@your-mailtrap-inbox.com",
      name: "User",
    };

    await transporter.sendMail({
      from: sender,
      to: recipients,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verify-email" : "reset-password"
      }?token=${hashedToken}">here</a> to 
        ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }.</p>
      `,
    });

    console.log("Email sent successfully");
    return { success: true };
  } catch (error: any) {
    console.error("Email error:", error);
    throw new Error(error.message);
  }
};
