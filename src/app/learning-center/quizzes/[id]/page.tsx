"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { quizzes } from "../../../../../public/data/quizes"; // Import quizzes from your data file
import Button from "@/components/Button";
import Quiz from "@/components/Quiz";

export default function QuizDetailsPage() {
  const { id } = useParams(); // Get the quiz ID from the route
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // State to store selected answers
  const [quizSubmitted, setQuizSubmitted] = useState(false); // State to track quiz submission
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // State to track quiz completion
  const [quizError, setQuizError] = useState<string | null>(null); // State to track quiz errors

  // Find the quiz by ID
  const quiz = quizzes.find((quiz) => quiz.id === Number(id));

  if (!quiz) {
    return <p className="text-red-500">Quiz not found!</p>;
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);

    // Validate the quiz answers
    const correctAnswers = quiz.questions.map((q: any) => q.correctAnswer);
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === correctAnswers[index]
    );

    if (isCorrect) {
      setIsQuizCompleted(true); // Mark the quiz as completed
      setQuizError(null); // Clear any previous errors
      alert("Quiz passed! Congratulations!"); // Show success message
    } else {
      setQuizError("Some answers are incorrect. Please try again."); // Show error message
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">{quiz.title}</h1>
        <p className="text-gray-600 mt-2">{quiz.description}</p>
      </div>

      {/* Quiz Questions */}
      <div className="space-y-8">
        {quiz.questions.map((question: any, index: number) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {index + 1}. {question.question}
            </h2>
            <div className="space-y-2">
              {question.options.map((option: string, optionIndex: number) => (
                <label
                  key={optionIndex}
                  className={`block p-3 border rounded-lg cursor-pointer transition ${
                    selectedAnswers[index] === option
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {quizError && (
        <p className="text-red-500 text-center mt-6">{quizError}</p>
      )}

      {/* Submit Button */}
      <div className="text-center mt-8">
        {!quizSubmitted ? (
          <Button onClick={handleSubmitQuiz} variant="primary">
            Submit Quiz
          </Button>
        ) : isQuizCompleted ? (
          <p className="text-green-600 font-bold text-lg">
            🎉 Congratulations! You passed the quiz!
          </p>
        ) : (
          <p className="text-red-500 font-bold text-lg">
            ❌ Please try again.
          </p>
        )}
      </div>
    </div>
  );
}