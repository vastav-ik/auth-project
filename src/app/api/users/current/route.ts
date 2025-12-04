import { getTokenData } from "../../../../helpers/getTokenData";
import { NextResponse, NextRequest } from "next/server";
import User from "../../../../models/userModel";
import connectDB from "../../../../db/config";

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const tokenData: any = getTokenData(request);
    const user = await User.findOne({ _id: tokenData.id }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User found", success: true, data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
