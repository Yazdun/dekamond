"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

const FormSchema = z.object({
  phonenumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine(
      (value) => {
        const cleaned = value.replace(/[\s-]/g, "");

        const pattern =
          /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/;

        return pattern.test(cleaned);
      },
      {
        message: "Please enter a valid Iranian mobile number.",
      },
    ),
});

export function PhoneForm() {
  const [_, setPhonenumber] = useQueryState("phonenumber");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phonenumber: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setPhonenumber(formData.phonenumber);
  }

  return (
    <div className="p-10 space-y-10 border rounded-md border-border/50">
      <div className="text-center grid gap-1">
        <h1 className="text-2xl">Let&apos;s get started</h1>
        <p className="text-sm text-secondary-foreground">
          Type in your phonenumber, and we’ll send you a confirmation code to
          confirm your login.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phonenumber</FormLabel>
                <FormControl>
                  <Input placeholder="09201378001" {...field} />
                </FormControl>
                <FormDescription>Enter your phonenumber</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="lg" className="w-full" type="submit">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
