const Joi = require("joi");

const email = Joi.string()
  .email()
  .required()
  .label("Email");
const password = Joi.string()
  .min(8)
  .max(30)
  .required()
  .label("Password");
const firstName = Joi.string()
  .alphanum()
  .max(150)
  .required()
  .label("First name");
const lastName = Joi.string()
  .alphanum()
  .max(150)
  .required()
  .label("Last name");

exports.signUp = Joi.object().keys({
  email,
  password,
  firstName,
  lastName
});

exports.signIn = Joi.object().keys({
  email,
  password
});
