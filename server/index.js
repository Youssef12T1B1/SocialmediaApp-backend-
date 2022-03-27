const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
