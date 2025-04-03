"use client"; // ✅ Marks this as a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
    </div>
  );
}
