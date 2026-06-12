"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="rounded-md border px-4 py-2"
      >
        Login with Google
      </button>
    </main>
  );
}