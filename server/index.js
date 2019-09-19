const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectRedis = require("connect-redis");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const config = require("./config");
const IN_PROD = config.app.env === "production";

const app = express();

const originsWhitelist = ["http://localhost:8080", config.app.frontendUrl];
const corsOptions = {
  origin(origin, callback) {
    if (
      originsWhitelist.includes(origin) ||
      origin.includes("//localhost:") ||
      !origin
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

const url = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`;

mongoose.Promise = global.Promise;
mongoose
  .connect(url, options)
  .then(function() {
    console.log("MongoDB is connected");
  })
  .catch(function(err) {
    console.log(err);
  });

//REDIS:
const RedisStore = connectRedis(session);
const store = new RedisStore({
  host: config.redis.host,
  port: config.redis.port
});

app.use(
  session({
    store,
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: config.session.lifetime,
      sameSite: true,
      secure: IN_PROD
    }
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IN_PROD
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

app.listen({ port: config.app.port }, () =>
  console.log(`Server running on port ${config.app.port}`)
);
