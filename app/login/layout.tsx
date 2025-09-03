import { ModeToggle } from "@/components/mode-toggle";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await verifyAuth();

  if (data) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
