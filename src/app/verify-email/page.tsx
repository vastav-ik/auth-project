"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) setToken(urlToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        setLoading(true);

        const response = await axios.post("/api/users/verify-email", { token });

        if (response.data.success) {
          toast.success("Email verified!");
          router.push("/login");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Verifying Email...</h1>
      <p className="text-gray-600 mt-2">
        Please wait while we verify your account.
      </p>

      {loading && <p className="text-blue-500 mt-4">Processing...</p>}

      <div className="mt-6">
        <Link href="/login" className="text-blue-500">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
