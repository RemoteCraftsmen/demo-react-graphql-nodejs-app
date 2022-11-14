require("dotenv").config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === "true";

const TEST_ENVIRONMENTS = ['test'];
const DEV_ENVIRONMENTS = ['dev', 'development'];
const PROD_ENVIRONMENTS = ['prod', 'production'];
const AVAILABLE_ENVIRONMENTS = [...TEST_ENVIRONMENTS, ...DEV_ENVIRONMENTS, ...PROD_ENVIRONMENTS];

const currentEnvironment = env('NODE_ENV');

if (!AVAILABLE_ENVIRONMENTS.includes(currentEnvironment)) {
  console.warn(`NODE_ENV is incorrect. Should be one of: ${AVAILABLE_ENVIRONMENTS.join(', ')}.`);
}

const config = {
  env: currentEnvironment,
  isDev: DEV_ENVIRONMENTS.includes(currentEnvironment),
  isTest: TEST_ENVIRONMENTS.includes(currentEnvironment),
  isProduction: PROD_ENVIRONMENTS.includes(currentEnvironment),
  app: {
    env: env("NODE_ENV"),
    port: parseInt(env("PORT", 4000)),
    frontendUrl: env("FRONTEND_URL"),
    corsSites: env('CORS_SITES')
  },
  db: {
    url: `mongodb://${env('MONGO_ROOT', 'guest')}:${env('MONGO_PASS', 'guest')}@${env(
        'MONGO_HOST',
        'localhost'
    )}:${env('MONGO_PORT', 27017)}/${env('MONGO_NAME', 'mongo_database')}?authSource=admin`,
    user: env("MONGO_ROOT"),
    pass: env("MONGO_PASSWORD"),
    host: env("MONGO_HOST"),
    port: env("MONGO_PORT"),
    name: env("MONGO_NAME")
  },
  redis: {
    host: env("REDIS_HOST"),
    port: env("REDIS_PORT"),
    password: env("REDIS_PASSWORD")
  },
  session: {
    name: env("SESSION_NAME"),
    secret: env("SESSION_SECRET"),
    lifetime: parseInt(env("SESSION_LIFETIME", 3600000))
  }
};

module.exports = config;
