"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
      console.log("Login success", response.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong with login";
      toast.error(errorMessage);
      console.log("Login error", error);
      console.log("Login error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="  flex flex-col  items-center justify-center min-h-screen">
          <h1 className="  text-center w-full items-center justify-center mb-8 text-4xl font-bold text-white">
            {loading ? "Logging in..." : "Login Page"}
          </h1>
          <div className="flex flex-col gap-4">
            <input
              className="border border-white p-2 rounded-md"
              type="email"
              placeholder="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              className="border border-white p-2 rounded-md"
              type="password"
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              className="border border-white p-2 rounded-md"
              onClick={onLogin}
            >
              Login
            </button>
            <Link href="/signup">
              <p className="text-white underline text-center">
                Don't have an account? Signup
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
