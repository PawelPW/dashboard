"use client"; // ✅ Important: Marks this as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { Link } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const mockUser = {
    email: "a@wpl.pl",
    password: "aaaaaaa",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication
    const isAuthenticated = true;
    if(isAuthenticated === true){
      router.push('/dashboard');
    }
  //   if (email === mockUser.email && password === mockUser.password) {
  //       localStorage.setItem("isAuthenticated", "true");
  //       router.push("/dashboard");
  //     } else {
  //         setError("Invalid email or password");
  //     };
  //   //   router.push("/dashboard"); // Redirect to dashboard
  //   // } else {
  //   //   setError("Invalid email or password");
  //   // }
  // };
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className = "text-center text-sm text-gray-600 mt-4">
           <Link href="/register" className="text-blue-600 hover:underline">
            Register here
           </Link>
        </p>
      </div>
    </div>
  );
}
