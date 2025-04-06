export const sqlChallenges = [{
    id: 1,
    title: "Select all users",
    description: "Write a query to return all users from the 'users' table.",
    setupSQL: `
      CREATE TABLE users (id INTEGER, name TEXT);
      INSERT INTO users (id, name) VALUES (1, 'Alice'), (2, 'Bob');
    `,
    solutionQuery: "SELECT * FROM users;",
    expectedResult: {
      columns: ["id", "name"],
      values: [
        [1, "Alice"],
        [2, "Bob"]
      ]
    }
}] 
  // Add more challenges here... 