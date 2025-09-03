"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Logout</Button>
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
