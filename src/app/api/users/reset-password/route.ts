import connectDB from "@/db/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { token, id, password } = await request.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
    if (!user.forgotPasswordToken || !user.forgotPasswordTokenExpiry) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const isValid = await bcrypt.compare(token, user.forgotPasswordToken);

    const isNotExpired = user.forgotPasswordTokenExpiry.getTime() > Date.now();

    if (!isValid || !isNotExpired) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
