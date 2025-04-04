import TestSimulatorLayout from "@/components/TestSimulatorLayout";

export default function TestSimulatorPage({ children }: { children: React.ReactNode }) {
  return (
    <TestSimulatorLayout>
      <h1 className="text-2xl font-bold">🚀 Welcome to Your test simulator</h1>
      <p className="text-gray-600">Select a section from the sidebar to begin.</p>
    </TestSimulatorLayout>
  );
}
