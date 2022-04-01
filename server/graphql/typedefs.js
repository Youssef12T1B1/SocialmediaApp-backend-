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
  type Post {
    content: String!
    owner: User!
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
  input postInput {
    content: String!
  }
  type Mutation {
    register(input: userInput!): User!
    login(input: loginInput!): LoginOutput!
    createPost(input: postInput!): Post!
  }
`;
module.exports = typeDefs;
