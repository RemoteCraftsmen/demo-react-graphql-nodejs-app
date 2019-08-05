const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User
    signIn(email: String!, password: String!): User
    signOut: Boolean
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    todos: [Todo!]!
  }
`;

module.exports = user;
