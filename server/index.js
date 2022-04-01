const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./config/db");
const models = require("./models/main");
const { decryptToken } = require("./useful/auth");
connectDB();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const token = req.headers.authtoken;
    const user = decryptToken(token);
    return {
      models,
      user,
    };
  },
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Serveris  running on ${url}`))
  .catch((err) => console.log(err));
