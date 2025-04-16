"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { materials } from "../../../../../public/data/materials"; // Adjust the path as necessary
import Button from "@/components/Button";
import Quiz from "@/components/Quiz";

export default function MaterialDetailsPage() {
  const { id } = useParams(); // Get the dynamic route parameter
  const [showQuiz, setShowQuiz] = useState(false); // State to control quiz visibility
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // State to store selected answers
  const [quizSubmitted, setQuizSubmitted] = useState(false); // State to track quiz submission
  const material = materials.find((item) => item.id === Number(id)); // Find the material by ID
  
  
  console.log(`Material ID: ${id}`); // Log the ID for debugging
  console.log(`Material details:`, material?.description); // Log the materials for debugging)

  if (!material) {
    return <p className="text-red-500">Material not found!</p>;
  }
  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };
    const handleSubmitQuiz = () => {
        setQuizSubmitted(true);
    };
    return (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{material.icon} {material.title}</h1>
          <p className="text-gray-600 mb-6">{material.description}</p>
          <div className="prose prose-blue">
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{material.content}</code>
            </pre>
          </div>
          <div className="mt-6">
          <Button onClick={() => setShowQuiz(true)} variant="primary">Take Quiz</Button>
            </div>
          {showQuiz && (
             <Quiz
                quiz={material.quiz}
                selectedAnswers={selectedAnswers}
                quizSubmitted={quizSubmitted}
                onAnswerChange={handleAnswerChange}
                onSubmitQuiz={handleSubmitQuiz}
            />
          )}
          <div className="mt-4">
            <Button onClick={() => history.back()} variant="secondary"> Go back</Button>
          </div>
        </div>
      );
    }