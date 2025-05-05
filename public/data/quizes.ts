export const quizzes = [
    {
      id: 1,
      title: "JavaScript Basics Quiz",
      description: "Test your knowledge of JavaScript fundamentals.",
      icon: "📜",
      questions: [
        {
          question: "What is the output of `console.log(typeof null)`?",
          options: ["object", "null", "undefined", "number"],
          correctAnswer: "object",
        },
        {
          question: "Which method is used to add an element to the end of an array?",
          options: [".push()", ".pop()", ".shift()", ".unshift()"],
          correctAnswer: ".push()",
        },
        {
          question: "What does `NaN` stand for?",
          options: ["Not a Number", "Null and None", "Negative and Null", "None of the Above"],
          correctAnswer: "Not a Number",
        },
      ],
    },
    {
      id: 2,
      title: "React Essentials Quiz",
      description: "Assess your understanding of React concepts.",
      icon: "⚛️",
      questions: [
        {
          question: "What is the purpose of React's `useState` hook?",
          options: [
            "To manage component state",
            "To fetch data from an API",
            "To handle side effects",
            "To optimize rendering",
          ],
          correctAnswer: "To manage component state",
        },
        {
          question: "What is JSX?",
          options: [
            "A JavaScript syntax extension",
            "A library for managing state",
            "A tool for optimizing React apps",
            "A CSS preprocessor",
          ],
          correctAnswer: "A JavaScript syntax extension",
        },
        {
          question: "Which lifecycle method is equivalent to `useEffect` with no dependencies?",
          options: ["componentDidMount", "componentDidUpdate", "componentWillUnmount", "shouldComponentUpdate"],
          correctAnswer: "componentDidMount",
        },
      ],
    },
    {
      id: 3,
      title: "CSS Mastery Quiz",
      description: "Challenge yourself with advanced CSS questions.",
      icon: "🎨",
      questions: [
        {
          question: "Which CSS property is used to change the text color of an element?",
          options: ["color", "font-color", "text-color", "background-color"],
          correctAnswer: "color",
        },
        {
          question: "What is the default position value of an HTML element?",
          options: ["static", "relative", "absolute", "fixed"],
          correctAnswer: "static",
        },
        {
          question: "Which CSS property is used to create space between an element's border and its content?",
          options: ["margin", "padding", "border-spacing", "spacing"],
          correctAnswer: "padding",
        },
      ],
    },
  ];