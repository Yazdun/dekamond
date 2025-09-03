import { verifyAuth } from "@/lib/auth";
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

  return <div className="overflow-x-hidden">{children}</div>;
}
