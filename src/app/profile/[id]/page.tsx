import React from "react";
interface UserProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;

  return <h1>User ID: {id}</h1>;
}
