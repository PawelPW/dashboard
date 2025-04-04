import SqlChallengesLayout from "@/components/SqlChallengesLayout";

export default function SqlChallengesPage({ children }: { children: React.ReactNode }) {
  return (
    <SqlChallengesLayout>
      <h1 className="text-2xl font-bold">🚀 Welcome to Your sql SqlChallengesLayout</h1>
      <p className="text-gray-600">Select a section from the sidebar to begin.</p>
    </SqlChallengesLayout>
  );
}
