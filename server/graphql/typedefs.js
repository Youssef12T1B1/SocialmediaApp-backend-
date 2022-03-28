const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }
  type Query {
    users(createdAt: String): [User!]!
  }
  input userInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    register(input: userInput!): User!
  }
`;
module.exports = typeDefs;
