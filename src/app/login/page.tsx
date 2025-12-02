"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
    <div>
      <div>
        <div className="  flex flex-col  items-center justify-center min-h-screen">
          <h1 className="  text-center w-full items-center justify-center mb-8 text-4xl font-bold text-white">
            Login Page{" "}
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
