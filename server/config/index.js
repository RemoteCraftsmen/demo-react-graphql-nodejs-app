const config = {
  app: {
    env: "development",
    port: 4000
  },
  db: {
    user: "root",
    pass: "password",
    host: "localhost",
    port: 27017,
    name: "mongo_database"
  },
  redis: {
    host: "127.0.0.1",
    port: 6379
  },
  session: {
    name: "session",
    secret: "secret",
    lifetime: 3600000
  }
};

module.exports = config;
