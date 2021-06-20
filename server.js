const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB_CONNECTION_URL } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen({ port: 3000 });
  })
  .then(({ url }) => console.log(`Server started at ${url}`));
