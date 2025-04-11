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
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [points, setPoints] = useState<number|null> (null);

  const MAX_TIME = 100; // Maximum time in seconds

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

    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }
    , 1000);
    setIntervalId(id);
    return () => {
      if (id) {
        clearInterval(id);
      }
    }
  }, [challenge]);
  
  const handleRun = () => {
    console.log("Running query:", query);
    if (!db) {
      setError("Failed to load database.");
      setQueryResult(null); // Clear the table
      return;
    }
  
    try {
      const result = db.exec(query);
  
      if (result.length === 0) {
        setFeedback("Query ran, but returned no results.");
        setQueryResult(null); // Clear the table
        return;
      }
  
      const { columns, values } = result[0];
  
      // Compare the result with the expected output
      const pass =
        JSON.stringify(columns) === JSON.stringify(challenge.expectedResult.columns) &&
        JSON.stringify(values) === JSON.stringify(challenge.expectedResult.values);
      
        if(pass){
          setFeedback("Correct!")
          setQueryResult({ columns, values }); // Show the table only when the query is valid    
          if (intervalId) clearInterval(intervalId);
          const calculatedPoints = Math.max(100 - timer, 10);
          setPoints(calculatedPoints);

        }else{
          setFeedback("Incorrect, try again.");
          setQueryResult(null);
        }
      
    } catch (err: any) {
      setFeedback("Error: " + err.message);
      setQueryResult(null); // Clear the table on error
    }
  };
  const progressPercentage = Math.max(((MAX_TIME - timer) / MAX_TIME) * 100, 0); // Calculate remaining progress

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{challenge.title}</h1>
        <p className="text-gray-600 mb-6">{challenge.description}</p>

        {/* Timer */}
          <div className="mb-4">
          <p className="text-gray-600">
            ⏱ Time Elapsed: <span className="font-bold">{timer} seconds</span>
          </p>
          </div>

        
        {/* Reverse Progress Bar */}
      <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}>
          </div>
      </div>  

        {/* SQL Input */}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={5}
          placeholder="Write your SQL here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Run Query Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleRun}
        >
          Run Query
        </button>

        {/* Feedback */}
        {feedback && (
          <p
            className={`mt-4 font-semibold ${
              feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}

        {/* Query Results */}
        {queryResult && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Query Results:</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr>
                    {queryResult.columns.map((column, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 bg-gray-100 text-left font-medium text-gray-700"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {queryResult.values.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((value, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 px-4 py-2 text-gray-700"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
