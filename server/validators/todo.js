const Joi = require("joi");

exports.checkTodo = Joi.object().keys({
  description: Joi.string()
    .min(2)
    .max(100)
    .required()
    .label("Description")
});
