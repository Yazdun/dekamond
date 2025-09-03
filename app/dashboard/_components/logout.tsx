"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    setOpen(false);
    await logout();
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button disabled={loading} variant="outline">
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Loading...
            </>
          ) : (
            "Logout"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-2">
          <p>Any unsaved data will be lost, are you sure you want to logout?</p>
          <Button onClick={handleLogout} variant="destructive">
            Proceed to logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
