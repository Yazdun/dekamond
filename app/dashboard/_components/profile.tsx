import { User } from "@/lib/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User2 } from "lucide-react";

export function Profile({ data }: { data: User }) {
  return (
    <div className="md:p-10 p-5 border border-border/50 rounded-md">
      <div className="flex items-start gap-5">
        <Avatar className="w-15 h-15">
          <AvatarImage src={data.picture ?? ""} />
          <AvatarFallback>{data.name.first.charAt(0)}</AvatarFallback>
        </Avatar>
        <ul className="grid gap-1">
          <li className="flex items-center gap-1">
            <User2 size={18} />
            <p>
              <span>{data.name.first}</span> <span>{data.name.last}</span>
            </p>
          </li>
          <li className="flex items-center gap-1">
            <Mail size={18} />
            <span className="truncate md:max-w-full max-w-[200px]">
              {data.email}
            </span>
          </li>
          <li className="flex items-center gap-1">
            <Phone size={18} />
            {data.phonenumber}
          </li>
        </ul>
      </div>
    </div>
  );
}
