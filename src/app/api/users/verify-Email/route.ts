import connectDB from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const reqBody = await request.json();
    const { token, userId } = reqBody;

    if (!token || !userId) {
      return NextResponse.json(
        { error: "Missing token or User ID" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    if (
      !user.verifyToken ||
      !user.verifyTokenExpiry ||
      new Date(user.verifyTokenExpiry).getTime() < Date.now()
    ) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const isTokenValid = await bcrypt.compare(token, user.verifyToken);

    if (!isTokenValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
