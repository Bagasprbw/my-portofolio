"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}