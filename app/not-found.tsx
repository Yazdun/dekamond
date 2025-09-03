import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen p-5 flex items-center justify-center">
      <div className="p-10 border text-center rounded-md border-border/50">
        <h1 className="font-mono text-3xl">404</h1>
        <p>This page does not exist or has been removed</p>
        <Button className="mt-5" variant="secondary" asChild>
          <Link href={`/dashboard`}>Go Back</Link>
        </Button>
      </div>
    </div>
  );
}
