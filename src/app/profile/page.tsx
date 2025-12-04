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
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile page!</p>
      <p className="font-bold">
        User ID:{" "}
        {user === "Nothing" ? (
          "Loading..."
        ) : (
          <Link href={`/profile/${user}`}>{user}</Link>
        )}
      </p>
      <h2></h2>

      <hr />
      <div className="bgc-light pad-m text-2xl font-bold text-center flex flex-col items-center justify-center gap-4 py-2">
        <h2>Profile Information</h2>
        <p>This is where your profile details would be displayed.</p>
      </div>
      <div>
        <button
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUser}
        >
          Get User
        </button>
      </div>
      <hr />
    </div>
  );
}
