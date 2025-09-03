"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "./constants";

export type User = {
  phonenumber: string;
  name: {
    first: string;
    last: string;
    full: string;
  };
  email: string;
  picture: string;
  iat?: number;
  exp?: number;
};

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyAuth(): Promise<TResponseOverload<User>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME);

    if (!token?.value) {
      return { data: null, error: { message: "Invalid token." } };
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as User;

    return {
      data: decoded,
      error: null,
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    await removeAuthToken();
    return { data: null, error: { message: "JWT verification failed." } };
  }
}

export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function logout(): Promise<void> {
  await removeAuthToken();
}
