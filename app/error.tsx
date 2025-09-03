"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen justify-center flex items-center p-5">
      <div className="p-10 border text-center rounded-md border-border/50">
        <h1 className="font-mono text-3xl">500</h1>
        <p>Something went wrong, please try again</p>

        <Button variant="secondary" className="mt-5" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
