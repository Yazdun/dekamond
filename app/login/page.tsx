import React from "react";
import { LoginForm } from "./_components/login-form";
import { Metadata } from "next";
import { OpenGraph } from "@/lib/og";

export const metadata: Metadata = {
  ...OpenGraph,
  title: "Dekamond | Login",
};

export default function Page() {
  return (
    <div className="h-screen p-5 flex justify-center items-center">
      <LoginForm />
    </div>
  );
}
