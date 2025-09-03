import { verifyAuth } from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { error } = await verifyAuth();

  if (error) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
