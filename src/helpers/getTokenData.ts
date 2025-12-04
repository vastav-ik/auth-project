import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
