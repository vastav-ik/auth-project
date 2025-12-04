"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(""); // Add state for userId
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const urlId = params.get("id"); // Get ID from URL

    if (urlToken) setToken(urlToken);
    if (urlId) setUserId(urlId);
  }, []);

  useEffect(() => {
    if (token.length > 0 && userId.length > 0) {
      verifyUserEmail();
    }
  }, [token, userId]);

  const verifyUserEmail = async () => {
    try {
      // Send both token and userId
      await axios.post("/api/users/verifyEmail", { token, userId });
      setVerified(true);
      toast.success("Email verified successfully");
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
      toast.error(error.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl text-black">Verify Email</h1>

      {!verified && !error && (
        <h2 className="p-2 bg-orange-500 text-black">Verifying...</h2>
      )}

      {verified && (
        <div>
          <h2 className="text-2xl text-black">Email Verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
