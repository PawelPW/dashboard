"use client";
import LearningCenterLayout from "@/components/LearningCenterLayout";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { quizzes } from "../../../../public/data/quizes";
export default function LearningMaterialsPage() {
  const router = useRouter();
  return (
    <LearningCenterLayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📚 Quizes</h1>
        <p className="text-gray-600">
          Explore a variety of quizes to challenge your knowledge.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search quizes..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{quiz.icon}</span>
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <Button onClick={() => router.push(`/learning-center/quizzes/${quiz.id}`)}>
              View Material
            </Button>
          </div>
        ))}
      </div>
    </LearningCenterLayout>
  );
}
