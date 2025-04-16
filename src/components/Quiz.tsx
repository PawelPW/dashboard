import React from "react";
import Button from "./Button";

interface QuizProps {
    quiz: {
        question: string;
        options: string[];
        correctAnswer: string;
    }[];
    selectedAnswers: string[];
    quizSubmitted: boolean;
    onAnswerChange: (questionIndex: number, answer: string) => void;
    onSubmitQuiz: () => void;
};

const Quiz: React.FC<QuizProps> = ({
    quiz,
    selectedAnswers,
    quizSubmitted,
    onAnswerChange,
    onSubmitQuiz,
  }) => { return (
    <div className="mt-8 p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      {quiz.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="font-semibold">{index + 1}. {question.question}</p>
          <div className="mt-2">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="block">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => onAnswerChange(index, option)}
                  disabled={quizSubmitted}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      {!quizSubmitted ? (
        <Button onClick={onSubmitQuiz} variant="primary">Submit Quiz</Button>
      ) : (
        <div className="mt-4">
          {quiz.map((question, index) => (
            <p
              key={index}
              className={`font-semibold ${
                selectedAnswers[index] === question.correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {index + 1}. {selectedAnswers[index] === question.correctAnswer ? "Correct!" : "Incorrect!"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;