"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
    setId(params.get("id") || "");
  }, []);

  const onReset = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/users/reset-password", { token, id, password });
      toast.success("Password reset! Please login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Reset Password</h1>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-black"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        onClick={onReset}
        className="p-2 bg-blue-500 text-white rounded-lg"
      >
        Change Password
      </button>
    </div>
  );
}
