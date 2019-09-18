"use strict";
const EasyGraphQLTester = require("easygraphql-tester");
const schemaCode = require("../types");

describe("Testing queries and mutations", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  describe("Testing queries", () => {
    it("Should pass if query 'me' is valid", () => {
      const query = `
            {
                me {
                    id
                    email
                    firstName
                    lastName
                    todos {
                        description
                    }
                }
            }`;
      tester.test(true, query);
    });

    it("Should pass if query 'users' is valid", () => {
      const query = `
              {
                  users {
                      id
                      email
                      firstName
                      lastName
                      todos {
                          id
                          description
                          completed
                      }
                  }
              }`;
      tester.test(true, query);
    });

    it("Should pass if query 'todos' is valid", () => {
      const query = `
                {
                    todos {
                        id
                        description
                        completed
                        user {
                            id
                            email
                        }
                    }
                }`;
      tester.test(true, query);
    });

    it("Should not pass if query 'me' is invalid", () => {
      const query = `
          {
              me {
                  notValidField
                  id
              }
          }`;
      tester.test(false, query);
    });
  });

  describe("Testing mutations", () => {
    const signUpMutation = `
    mutation signUp(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
      ) {
        signUp(
          email: $email
          password: $password
          firstName: $firstName
          lastName: $lastName
        ) {
          id
        }
      }
  `;
    it("Should pass if signUp mutation is valid", () => {
      tester.test(true, signUpMutation, {
        email: "email@email.com",
        password: "secretpassword",
        firstName: "Name",
        lastName: "Name"
      });
    });

    it("Should not pass if one value on signUp mutation is missing", () => {
      tester.test(false, signUpMutation, {
        email: "email@email.com",
        password: "secretpassword",
        firstName: "Name"
      });
    });

    it("Should pass if signIn mutation is valid", () => {
      const mutation = `
            mutation signIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                  id
                }
              }
          `;
      tester.test(true, mutation, {
        email: "email@email.com",
        password: "secretpassword"
      });
    });

    it("Should pass if createTodo mutation is valid", () => {
      const mutation = `
        mutation createTodo($description: String!) {
            createTodo(description: $description) {
              id
              description
              completed
            }
          }
        `;
      tester.test(true, mutation, { description: "New todo" });
    });

    const deleteTodoMutation = `
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
          id
        }
      }
    `;

    it("Should pass if deleteTodo mutation is valid", () => {
      tester.test(true, deleteTodoMutation, { id: 1 });
    });

    it("Should not pass if id on deleteTodo mutation is missing", () => {
      tester.test(false, deleteTodoMutation, {});
    });

    const updateTodoMutation = `
    mutation updateTodo($id: ID!, $completed: Boolean!) {
        updateTodo(id: $id, completed: $completed) {
          completed
        }
      }`;

    it("Should pass if updateTodo mutation is valid", () => {
      tester.test(true, updateTodoMutation, { id: 1, completed: false });
    });

    it("Should not pass if value on updateTodo mutation is missing", () => {
      tester.test(false, updateTodoMutation, { id: 1 });
    });
  });
});
