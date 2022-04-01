const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type LoginOutput {
    username: String!
    email: String!
    token: String!
  }
  type Post {
    id: ID!
    content: String!
    owner: User!
  }
  type Query {
    posts: [Post!]!
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
