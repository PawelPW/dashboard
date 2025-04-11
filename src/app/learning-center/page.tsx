import LearningCenterLayout from "@/components/LearningCenterLayout";

export default function TestPlaygroundPage({ children }: { children: React.ReactNode }) {
  return (
    <LearningCenterLayout>
      <h1 className="text-2xl font-bold">🚀 Welcome to Learning Center</h1>
      <p className="text-gray-600">Select a section from the sidebar to begin.</p>
    </LearningCenterLayout>
  );
}
