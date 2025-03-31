"use client"; // ✅ Important: Marks this as a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // ✅ Redirect to login page
  }, [router]);

  return null; // No UI needed, just redirects
}
