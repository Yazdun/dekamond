"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

export async function handleLogin(payload: {
  phonenumber: string | null;
}): Promise<TResponseOverload<User>> {
  if (!payload.phonenumber) {
    return {
      data: null,
      error: { message: "Please provide a valid phonenumber" },
    };
  }

  const cookieStore = await cookies();

  const JWT_SECRET = process.env.JWT_SECRET!;
  const token = jwt.sign(
    {
      phonenumber: payload.phonenumber,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    },
    JWT_SECRET,
  );

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return { data: { phonenumber: payload.phonenumber }, error: null };
}
