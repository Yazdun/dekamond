import { verifyAuth } from "@/lib/auth";
import React from "react";
import { Profile } from "./_components/profile";
import { LogoutButton } from "./_components/logout";

export default async function Page() {
  const { data, error } = await verifyAuth();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="h-screen items-center justify-center flex">
      <div className="flex flex-col gap-5 p-5">
        <h1 className="font-medium text-xl">
          Welcome to Decamond, {data.name.first}! 👋
        </h1>
        <Profile data={data} />
        <div className="flex items-center justify-end gap-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
