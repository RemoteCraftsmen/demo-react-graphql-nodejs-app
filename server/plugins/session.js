const session = require("express-session");
const connectRedis = require("connect-redis");
const config = require("../config");

module.exports = (app) => {
    const RedisStore = connectRedis(session);
    const store = new RedisStore({ ...config.redis });

    let sessionConfig = {
        store,
        name: config.session.name,
        secret: config.session.secret,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: config.session.lifetime,
            sameSite: true
        }
    };

    if (config.isProduction) {
        app.set("trust proxy", 1);
        sessionConfig.cookie.secure = true;
    }

    app.use(session(sessionConfig));
}
