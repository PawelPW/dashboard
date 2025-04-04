"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function SqlChallengesLayout() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState("");

  const runQuery = async () => {
    try {
      const response = await fetch("/api/sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data.result);
      setError("");
    } catch (err: any) {
      setError(err.message);
      setResult([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">🧠 Challenge</h2>
          <p className="text-gray-700">
            Write a query to list all users who signed up in the last 7 days.
          </p>
        </section>

        <section>
          <textarea
            className="w-full p-4 font-mono border rounded-lg shadow-sm"
            rows={8}
            placeholder="Write your SQL query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={runQuery}
          >
            Run Query
          </button>
        </section>

        <section>
          <h3 className="text-lg font-semibold">📤 Output</h3>
          {error && <p className="text-red-500">{error}</p>}
          {!error && result.length > 0 && (
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr>
                  {Object.keys(result[0]).map((col) => (
                    <th key={col} className="p-2 border-b">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((cell, j) => (
                      <td key={j} className="p-2 border-b">{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}
