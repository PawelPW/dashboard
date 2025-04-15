"use client";

import { useParams } from "next/navigation";
import { materials } from "../../../../../public/data/materials"; // Adjust the path as necessary

export default function MaterialDetailsPage() {
  const { id } = useParams(); // Get the dynamic route parameter
  console.log(`Material ID: ${id}`); // Log the ID for debugging
  const material = materials.find((item) => item.id === Number(id)); // Find the material by ID
  console.log(`Material details:`, material?.description); // Log the materials for debugging)

  if (!material) {
    return <p className="text-red-500">Material not found!</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{material.icon} {material.title}</h1>
      <p className="text-gray-600 mb-6">{material.description}</p>
      <div className="prose prose-blue">
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{material.content}</code>
        </pre>
        </div>
      <button
        onClick={() => history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go Back
      </button>
    </div>
  );
}