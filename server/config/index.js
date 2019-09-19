require("dotenv").config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === "true";

const config = {
  app: {
    env: env("NODE_ENV"),
    port: parseInt(env("PORT", 4000)),
    frontendUrl: env("FRONTEND_URL")
  },
  db: {
    user: env("DB_USER"),
    pass: env("DB_PASS"),
    host: env("DB_HOST"),
    port: env("DB_PORT"),
    name: env("DB_NAME")
  },
  redis: {
    host: env("REDIS_HOST"),
    port: env("REDIS_PORT")
  },
  session: {
    name: env("SESSION_NAME"),
    secret: env("SESSION_SECRET"),
    lifetime: parseInt(env("SESSION_LIFETIME", 3600000))
  }
};

module.exports = config;
