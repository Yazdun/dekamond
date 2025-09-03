"use client";

import React from "react";
import { PhoneForm } from "./phone-form";
import { OTPForm } from "./otp-form";
import { useQueryState } from "nuqs";

export function LoginForm() {
  const [phonenumber] = useQueryState("phonenumber");

  return (
    <div className="w-full max-w-[450px]">
      {phonenumber ? <OTPForm /> : <PhoneForm />}
    </div>
  );
}
