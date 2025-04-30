"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { materials } from "../../../../../public/data/materials"; // Adjust the path as necessary
import Button from "@/components/Button";
import Quiz from "@/components/Quiz";
import { saveMaterialProgress } from "@/utils/progress";

export default function MaterialDetailsPage() {
  const { id } = useParams(); // Get the dynamic route parameter
  const [showQuiz, setShowQuiz] = useState(false); // Initially hide the quiz
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // State to store selected answers
  const [quizSubmitted, setQuizSubmitted] = useState(false); // State to track quiz submission
  const [isMaterialCompleted, setIsMaterialCompleted] = useState(false); // State to track material completion
  const [quizError, setQuizError] = useState<string | null>(null); // State to track quiz errors
  const material = materials.find((item) => item.id === Number(id)); // Find the material by ID
  const userID = localStorage.getItem("userId")

  if (!material) {
    return <p className="text-red-500">Material not found!</p>;
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = async () => {
    setQuizSubmitted(true);

    const correctAnswers = material.quiz.map((q: any) => q.correctAnswer); 
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === correctAnswers[index]
    );

    if (isCorrect) {
      try {
        await saveMaterialProgress(Number(userID), material.id, true); // Replace `1` with the actual user ID
        setIsMaterialCompleted(true); // Update the state
        setQuizError(null); // Clear any previous errors
        alert("Quiz passed! Material marked as completed."); // Show success message
      } catch (error) {
        console.error("Error marking material as completed:", error); // Log the error
        alert("Failed to mark material as completed."); // Show error message
      }
    } else {
      setQuizError("Some answers are incorrect. Please try again."); // Show error message
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {material.icon} {material.title}
      </h1>
      <p className="text-gray-600 mb-6">{material.description}</p>
      <div className="prose prose-blue">
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{material.content}</code>
        </pre>
      </div>
      <div className="mt-6">
        {isMaterialCompleted ? (
          <p className="text-green-600 font-bold">Material Completed!</p>
        ) : (
          <>
            {!showQuiz && (
              <Button onClick={() => setShowQuiz(true)} variant="primary">
                Take Quiz
              </Button>
            )}
            {showQuiz && (
              <Quiz
                quiz={material.quiz}
                selectedAnswers={selectedAnswers}
                quizSubmitted={quizSubmitted}
                onAnswerChange={handleAnswerChange}
                onSubmitQuiz={handleSubmitQuiz}
              />
            )}
            {quizError && <p className="text-red-500 mt-4">{quizError}</p>}
          </>
        )}
      </div>
      <div className="mt-4">
        <Button onClick={() => history.back()} variant="secondary">
          Go back
        </Button>
      </div>
    </div>
  );
}