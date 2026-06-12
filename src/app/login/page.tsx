import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import LoginButton from "./_components/login-button";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to manage your portfolio
                    </p>
                </div>

                <LoginButton />
            </div>
        </main>
    );
}