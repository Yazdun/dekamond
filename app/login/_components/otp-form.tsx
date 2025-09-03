"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MoveLeft } from "lucide-react";
import { handleLogin } from "./action";

const FormSchema = z.object({
  token: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export function OTPForm() {
  const [phonenumber, setPhonenumber] = useQueryState("phonenumber");

  const action = handleLogin.bind(null, { phonenumber });

  const [to] = useQueryState("to", {
    defaultValue: "/dashboard",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    const { data, error } = await action();

    if (error) {
      throw new Error("Failed to authenticate");
    }

    return { data };
  };

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const promise = handleSubmit();
    toast.promise(promise, {
      loading: "Verifying OTP...",
      success: () => {
        startTransition(() => router.push(to));
        router.refresh();
        return "Logged in successfully";
      },
      error: (err) => {
        return err.message ?? "something went wrong";
      },
    });
  }

  const label = () => {
    if (isPending) return "Redirecting you...";
    if (loading) return "Validating...";
    return "Continue";
  };

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:p-10 space-y-10 md:border rounded-md border-border/50"
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl">Verification</h1>
            <p className="text-sm text-center text-secondary-foreground">
              Please enter the verification code below. This is a mock app and
              any value will work here
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      autoFocus
                      maxLength={4}
                      {...field}
                      onComplete={form.handleSubmit(onSubmit)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="w-[54px] h-[54px]" index={0} />
                      </InputOTPGroup>

                      <InputOTPGroup>
                        <InputOTPSlot className="w-[54px] h-[54px]" index={1} />
                      </InputOTPGroup>

                      <InputOTPGroup>
                        <InputOTPSlot className="w-[54px] h-[54px]" index={2} />
                      </InputOTPGroup>

                      <InputOTPGroup>
                        <InputOTPSlot className="w-[54px] h-[54px]" index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-5 w-full">
              <Button
                className="flex items-center w-full gap-1"
                size="lg"
                type="submit"
                disabled={loading || isPending}
              >
                {label()}
              </Button>
              <button
                className="flex items-center gap-2 pr-5 text-sm hover:underline underline-offset-4"
                onClick={() => setPhonenumber(null)}
                type="button"
              >
                <MoveLeft size={14} />
                Back
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
