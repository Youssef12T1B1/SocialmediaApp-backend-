const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Serveris  running on ${url}`))
  .catch((err) => console.log(err));
