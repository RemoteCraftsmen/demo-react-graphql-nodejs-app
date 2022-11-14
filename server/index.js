const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./types");
const resolvers = require("./resolvers");
const { db, app: { isProduction, port, frontendUrl } } = require("./config");

const app = express();

const originsWhitelist = ["http://localhost:8080", frontendUrl];
const corsOptions = {
  origin(origin, callback) {
    if (
      !origin ||
      originsWhitelist.includes(origin) ||
      origin.includes("//localhost:")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

//MONGO:
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000
};

mongoose.Promise = global.Promise;
mongoose
  .connect(db.url, options)
  .then(function() {
    console.log("MongoDB is connected");
  })
  .catch(function(err) {
    console.log(err);
  });

require('./plugins/session')(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: isProduction
    ? false
    : {
        settings: {
          "request.credentials": "include"
        }
      },
  context: ({ req, res }) => ({ req, res }),
  cors: corsOptions
});

server.applyMiddleware({
  app,
  cors: corsOptions
});

app.listen({ port }, () =>
  console.log(`Server running on port ${port}`)
);
