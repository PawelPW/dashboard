"use client";
import LearningCenterLayout from "@/components/LearningCenterLayout";
import Button from "@/components/Button";
import { materials } from "../../../../public/data/materials";
import { useRouter } from "next/navigation";
export default function LearningMaterialsPage() {
  const router = useRouter();
  return (
    <LearningCenterLayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📚 Learning Materials</h1>
        <p className="text-gray-600">
          Explore a variety of resources to enhance your knowledge.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search materials..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div
            key={material.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{material.icon}</span>
              <h2 className="text-xl font-semibold">{material.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{material.description}</p>
            <Button onClick={() => router.push(`/learning-center/materials/${material.id}`)}>
              View Material
            </Button>
          </div>
        ))}
      </div>
    </LearningCenterLayout>
  );
}
