"use client";

import React from "react";
import { PhoneForm } from "./phone-form";
import { OTPForm } from "./otp-form";
import { useQueryState } from "nuqs";
import { AnimatePresence, motion } from "framer-motion";

export function LoginForm() {
  const [phonenumber] = useQueryState("phonenumber");

  return (
    <div className="w-full max-w-[450px]">
      <AnimatePresence initial={false} mode="wait">
        {phonenumber ? (
          <motion.div
            key="phonenumber"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <OTPForm />
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <PhoneForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
