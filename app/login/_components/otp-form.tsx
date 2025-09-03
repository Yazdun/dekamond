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
import { CornerDownRight, MoveLeft } from "lucide-react";

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function OTPForm() {
  const [phonenumber, setPhonenumber] = useQueryState("phonenumber");

  const [to] = useQueryState("to", {
    defaultValue: "/workspace/clients",
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

  const handleLogin = async ({ token }: { token: string }) => {
    setLoading(true);

    setLoading(false);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = handleLogin({
      token: data.token,
    });
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
          className="p-10 space-y-10 border rounded-md border-border/50"
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl">Verification</h1>
            <p className="text-sm text-center text-secondary-foreground">
              If you have access, we have sent a code to{" "}
              <strong>{phonenumber}</strong>. Enter it below.
            </p>
          </div>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      autoFocus
                      maxLength={6}
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
                      <InputOTPGroup>
                        <InputOTPSlot className="w-[54px] h-[54px]" index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot className="w-[54px] h-[54px]" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-5">
              <Button
                className="flex items-center w-full gap-1"
                size="lg"
                type="submit"
                disabled={loading || isPending}
              >
                {label()}
                <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded px-1.5 bg-white/20  font-mono font-medium">
                  <CornerDownRight size={15} className="opacity-80" />
                </kbd>
              </Button>
              <button
                className="flex items-center gap-2 pr-5 text-sm hover:underline underline-offset-4"
                onClick={() => setPhonenumber(null)}
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
