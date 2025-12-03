import React from "react";
interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  const { id } = params;

  return <h1>User ID: {id}</h1>;
}
