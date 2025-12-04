import connectDB from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs"; // Need bcrypt for comparison

export async function POST(request: NextRequest) {
  await connectDB(); // Ensure DB is connected
  try {
    const reqBody = await request.json();
    const { token, userId } = reqBody; // We now expect userId

    if (!token || !userId) {
      return NextResponse.json(
        { error: "Missing token or User ID" },
        { status: 400 }
      );
    }

    // 1. Find user by ID (not by token!)
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    // 2. Check if expiry exists and is valid
    // .getTime() ensures we compare numbers
    if (
      !user.verifyToken ||
      !user.verifyTokenExpiry ||
      new Date(user.verifyTokenExpiry).getTime() < Date.now()
    ) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    // 3. Verify the token matches the hash in DB
    const isTokenValid = await bcrypt.compare(token, user.verifyToken);

    if (!isTokenValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // 4. Verify user and clean up
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
