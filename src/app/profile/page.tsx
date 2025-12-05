"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const logout = async () => {
    try {
      await axios.get("/api/users/logout").then((response) => {
        console.log(response.data);
      });
      window.location.href = "/login";
      console.log("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/current");
      console.log("User data:", response.data);
      setUser(response.data.data._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl leading-6 font-bold text-gray-900">
              User Profile
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Welcome to your personal dashboard.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user === "" ? (
                    <span className="text-gray-400 italic">
                      Click "Get User" to load ID
                    </span>
                  ) : (
                    <Link
                      href={`/profile/${user}`}
                      className="text-blue-600 hover:text-blue-800 font-mono bg-blue-50 px-2 py-1 rounded"
                    >
                      {user}
                    </Link>
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-green-600 font-semibold sm:mt-0 sm:col-span-2">
                  Active
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            onClick={getUser}
          >
            Get User Details
          </button>
          <button
            className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
