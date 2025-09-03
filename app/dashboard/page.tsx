import { verifyAuth } from "@/lib/auth";
import React from "react";
import { Profile } from "./_components/profile";
import { LogoutButton } from "./_components/logout";
import { Metadata } from "next";
import { OpenGraph } from "@/lib/og";

export const metadata: Metadata = {
  ...OpenGraph,
  title: "Dekamond | Dashboard",
};

export default async function Page() {
  const { data, error } = await verifyAuth();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="h-screen items-center justify-center flex">
      <div className="flex flex-col gap-5 p-5">
        <h1 className="font-medium text-xl">
          Welcome to Dekamond, {data.name.first}! 👋
        </h1>
        <Profile data={data} />
        <div className="flex items-center justify-end gap-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
