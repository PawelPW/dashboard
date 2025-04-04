import TestPlaygroundLayout from "@/components/TestPlaygroundLayout";

export default function TestPlaygroundPage({ children }: { children: React.ReactNode }) {
  return (
    <TestPlaygroundLayout>
      <h1 className="text-2xl font-bold">🚀 Welcome to Your playground</h1>
      <p className="text-gray-600">Select a section from the sidebar to begin.</p>
    </TestPlaygroundLayout>
  );
}
