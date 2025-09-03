"use server";

type User = {
  phonenumber: string;
};

export async function handleLogin(payload: {
  phonenumber: string | null;
}): Promise<TResponseOverload<User>> {
  if (!payload.phonenumber) {
    return {
      data: null,
      error: { message: "Please provide a valid phonenumber" },
    };
  }

  return { data: { phonenumber: payload.phonenumber }, error: null };
}
