"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const urlId = params.get("id");

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
      await axios.post("/api/users/verifyEmail", { token, userId });
      setVerified(true);
      toast.success("Email verified successfully");
      // router.push("/login"); // Optional redirect
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
      toast.error(error.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Verify Email</h1>

        {!verified && !error && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <h2 className="text-lg font-medium text-gray-600">
              Verifying your token...
            </h2>
          </div>
        )}

        {verified && (
          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Verified!</h2>
            <p className="text-gray-500">
              Your email has been successfully verified.
            </p>
            <Link
              href="/login"
              className="inline-block w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-500">
              The token may be invalid or has expired.
            </p>
            <Link
              href="/signup"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium underline mt-2"
            >
              Back to Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
