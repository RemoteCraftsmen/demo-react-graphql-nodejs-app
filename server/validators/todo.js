const Joi = require("joi");

exports.createTodo = Joi.object().keys({
  description: Joi.string()
    .min(2)
    .max(100)
    .required()
    .label("Description")
});
