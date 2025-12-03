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
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      toast.error("Something went wrong with signup");
      console.log("Signup error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div>
      <div>
        <div className="  flex flex-col  items-center justify-center min-h-screen">
          <h1 className="  text-center w-full items-center justify-center mb-8 text-4xl font-bold text-white">
            {loading ? "Signing up..." : "Signup Page"}
          </h1>
          <div className="flex flex-col gap-4">
            <input
              className="border border-white p-2 rounded-md"
              type="text"
              placeholder="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
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
              className="border border-white p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold"
              onClick={onSignup}
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
      </div>
    </div>
  );
}
