"use client";
import { useState } from "react";
import TestPlaygroundLayout from "@/components/TestPlaygroundLayout";
import { codeChallenges } from "../../../public/data/codeChallenges";
import MonacoEditor from "@monaco-editor/react";

export default function TestPlaygroundPage() {
  const [selected, setSelected] = useState(codeChallenges[0]);
  const [code, setCode] = useState(selected.setupCode);
  const [test, setTest] = useState(selected.solutionCode || "");
  const [output, setOutput] = useState("");

  // Handle challenge change
  const handleSelectChallenge = (challenge: typeof codeChallenges[0]) => {
    setSelected(challenge);
    setCode(challenge.setupCode);
    setTest(challenge.solutionCode || "");
    setOutput("");
  };

  // Run user code and tests
  const runTests = () => {
    let result = "";
    try {
      // Combine user code and test code, run in a new function scope
      // eslint-disable-next-line no-new-func
      const userFunc = new Function(`${code}\n${test}`);
      userFunc();
      result = "✅ All tests passed!";
    } catch (e: any) {
      result = `❌ ${e.message}`;
    }
    setOutput(result);
  };

  return (
    <TestPlaygroundLayout>
      <h1 className="text-2xl font-bold mb-4">🚀 Coding Playground</h1>
      <div className="mb-6 flex flex-wrap gap-2">
        {codeChallenges.map((c) => (
          <button
            key={c.id}
            className={`px-3 py-1 rounded transition ${
              selected.id === c.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
            onClick={() => handleSelectChallenge(c)}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-6 h-[400px]">
        <div>
          <h2 className="font-semibold mb-2">Solution</h2>
          <MonacoEditor
            height="300px"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{ minimap: { enabled: false } }}
          />
        </div>
        <div>
          <h2 className="font-semibold mb-2">Tests</h2>
          <MonacoEditor
            height="300px"
            language="javascript"
            value={test}
            onChange={(value) => setTest(value ?? "")}
            options={{ minimap: { enabled: false } }}
          />
        </div>
      </div>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded font-bold mb-4"
        onClick={runTests}
      >
        Run Tests
      </button>
      <div className="mt-2 p-4 bg-gray-100 rounded min-h-[40px] font-mono">
        <strong>Result:</strong> {output}
      </div>
    </TestPlaygroundLayout>
  );
}