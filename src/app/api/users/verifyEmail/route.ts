import connectDB from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const reqBody = await request.json();
    const { token, id } = reqBody;

    if (!token || !id) {
      return NextResponse.json(
        { error: "Missing token or ID" },
        { status: 400 }
      );
    }
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
    if (!user.verifyTokenExpiry) {
      return NextResponse.json(
        { error: "No verification token found" },
        { status: 400 }
      );
    }
    const isTokenValid = bcrypt.compare(token, user.verifyToken ?? "");
    const isNotExpired =
      new Date(user.verifyTokenExpiry).getTime() > Date.now();
    if (!isTokenValid || !isNotExpired) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
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
