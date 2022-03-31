const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
  }
  type LoginOutput {
    username: String!
    email: String!
    token: String!
  }
  type Query {
    users(createdAt: String): [User!]!
  }
  input userInput {
    username: String!
    email: String!
    password: String!
  }
  input loginInput {
    username: String!
    password: String!
  }
  type Mutation {
    register(input: userInput!): User!
    login(input: loginInput!): LoginOutput!
  }
`;
module.exports = typeDefs;
