export const materials = [
    {
      id: 1,
      title: "Introduction to SQL",
      description: "Learn the basics of SQL and how to query databases.",
      content: `
      SQL (Structured Query Language) is a standard language for accessing and manipulating databases.
      In this tutorial, you will learn:
      - How to write basic SQL queries
      - How to filter data using WHERE clauses
      - How to sort and group data
      Example:
      \`\`\`sql
      SELECT * FROM users WHERE age > 18;
      \`\`\``,
      icon: "📘",
      quiz: [
        {
          question: "What does SQL stand for?",
          options: ["Structured Query Language", "Simple Query Language", "Standard Query Language"],
          correctAnswer: "Structured Query Language",
        },
        {
          question: "Which SQL keyword is used to retrieve data?",
          options: ["GET", "SELECT", "FETCH"],
          correctAnswer: "SELECT",
        },
      ],
    },
    {
      id: 2,
      title: "Advanced SQL Joins",
      description: "Master complex SQL joins with practical examples.",
      icon: "📙",
      quiz: []
    },
    {
      id: 3,
      title: "Database Optimization",
      description: "Optimize your database queries for better performance.",
      icon: "📗",
      quiz: []
    },
    // Add more materials as needed
  ];