"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful. Please verify your email.");

      router.push("/verify-request");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong with signup";
      toast.error(errorMessage);
      console.log("Signup error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center w-full items-center justify-center mb-8 text-4xl font-bold text-white">
        {loading ? "Signing up..." : "Signup Page"}
      </h1>
      <div className="flex flex-col gap-4">
        <input
          className="border border-white p-2 rounded-md text-white"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          className="border border-white p-2 rounded-md text-white"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="border border-white p-2 rounded-md text-white"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="border border-white p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold"
          onClick={onSignup}
          disabled={buttonDisabled || loading}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link href="/login">
          <p className="text-white underline text-center">
            Already have an account? Login
          </p>
        </Link>
      </div>
    </div>
  );
}
