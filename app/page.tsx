"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated" && mounted) {
      router.push("/dashboard");
    }
  }, [status, mounted, router]);

  if (!mounted || status === "loading") {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="flex items-center justify-between p-6 border-b border-gray-300">
        <div className="text-2xl font-bold">Task Manager</div>
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button className="bg-white text-black border border-black hover:bg-gray-100">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-black text-white hover:bg-gray-800">Sign Up</Button>
          </Link>
        </div>
      </nav>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-8 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Task Management
          </h1>
          <p className="text-lg text-gray-600">
            Organize your work with smart task management and AI-powered suggestions
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button className="bg-black text-white px-8 py-2 text-lg hover:bg-gray-800">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button 
                className="border border-black text-black bg-white hover:bg-gray-100 px-8 py-2 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg bg-gray-50 border border-gray-300">
              <h3 className="font-semibold mb-2 text-lg">Organize</h3>
              <p className="text-gray-700">Create and manage tasks with priority levels</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50 border border-gray-300">
              <h3 className="font-semibold mb-2 text-lg">Track</h3>
              <p className="text-gray-700">Monitor task status and deadlines</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50 border border-gray-300">
              <h3 className="font-semibold mb-2 text-lg">Improve</h3>
              <p className="text-gray-700">Get suggestions to improve your tasks</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
