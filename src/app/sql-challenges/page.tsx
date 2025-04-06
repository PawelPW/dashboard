"use client";

import { useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js/dist/sql-wasm.js";
import { sqlChallenges } from "../../../public/data/sqlChallenges";
import Sidebar from "@/components/Sidebar";



export default function SqlChallengePage({ children }: { children: React.ReactNode }) {
  const challenge = sqlChallenges[0]; 
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<{ columns: string[]; values: any[][] } | null>(null);
  useEffect(() => {
    const loadDb = async () => {
      const SQL = await initSqlJs({        
        locateFile: (file: string) => `/sql-wasm.wasm`,
      });
      console.log("String",SQL)
      // Initialize the database
      const newDb = new SQL.Database();
  
      // Run the setup SQL for the selected challenge
      newDb.run(challenge.setupSQL);
  
      // Set the database in state
      setDb(newDb);
    };
  
    loadDb();
  }, [challenge]);
  
  const handleRun = () => {
    console.log("Running query:", query);
    if (!db) {
      setError("Failed to load database.");
      return; 
    }
    try {
      const result = db.exec(query);
      if (result.length === 0) {
        setFeedback("Query ran, but returned no results.");
        setQueryResult(null); // Clear previous results
        return;
      }
      const { columns, values } = result[0];

      setQueryResult({ columns, values });

      const pass =
        JSON.stringify(columns) === JSON.stringify(challenge.expectedResult.columns) &&
        JSON.stringify(values) === JSON.stringify(challenge.expectedResult.values);

      setFeedback(pass ? "✅ Correct!" : "❌ Incorrect, try again.");
    } catch (err: any) {
      setFeedback("Error: " + err.message);
    }
  };

  return(
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold">{challenge.title}</h1>
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        <textarea
          className="w-full p-2 border rounded"
          rows={5}
          placeholder="Write your SQL here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleRun}>
          Run Query
        </button>
        {feedback && <p className="mt-3 font-semibold">{feedback}</p>}
      </div>
      {queryResult && (
      <div className="mt-4">
        <h2 className="text-lg font-bold">Query Results:</h2>
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr>
              {queryResult.columns.map((column, index) => (
                <th key={index} className="border border-gray-300 px-2 py-1 bg-gray-100">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queryResult.values.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-2 py-1">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
    
  );
}
