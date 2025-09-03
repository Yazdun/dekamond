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

  try {
    // Fetch user data from randomuser.me API
    const response = await fetch("https://randomuser.me/api/?results=1&nat=us");

    if (!response.ok) {
      return {
        data: null,
        error: { message: "Failed to fetch user data" },
      };
    }

    const userData = await response.json();
    const user = userData.results[0];

    // Extract user information
    const userInfo = {
      phonenumber: payload.phonenumber,
      name: {
        first: user.name.first,
        last: user.name.last,
        full: `${user.name.first} ${user.name.last}`,
      },
      email: user.email,
      picture: user.picture.large,
    };

    const cookieStore = await cookies();

    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign(
      {
        ...userInfo,
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

    return { data: userInfo, error: null };
  } catch (error) {
    console.error("Error in handleLogin:", error);
    return {
      data: null,
      error: { message: "An error occurred during login" },
    };
  }
}
