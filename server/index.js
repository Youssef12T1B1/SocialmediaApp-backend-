const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./config/db");
const models = require("./models/main");
connectDB();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return {
      models,
    };
  },
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Serveris  running on ${url}`))
  .catch((err) => console.log(err));
