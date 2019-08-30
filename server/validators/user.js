const Joi = require("joi");

const email = Joi.string()
  .email()
  .required()
  .label("Email")
  .error(errors => {
    return errors.map(error => {
      switch (error.type) {
        case "string.email":
          return new Error("Email is invalid.");
        case "any.empty":
          return new Error("Email is required.");
      }
    });
  });
const password = Joi.string()
  .min(8)
  .max(30)
  .required()
  .label("Password")
  .error(errors => {
    return errors.map(error => {
      switch (error.type) {
        case "string.min":
          return new Error("Password must be at least 8 characters long.");
        case "string.max":
          return new Error("Password must be no longer than 30 characters.");
        case "any.empty":
          return new Error("Password is required.");
      }
    });
  });
const firstName = Joi.string()
  .alphanum()
  .min(3)
  .max(150)
  .required()
  .label("First name")
  .error(errors => {
    return errors.map(error => {
      switch (error.type) {
        case "string.min":
          return new Error("Name must be at least 3 characters long.");
        case "string.max":
          return new Error("Name must be no longer than 150 characters.");
        case "any.empty":
          return new Error("Name is required.");
        case "string.alphanum":
          return new Error("Name can't contain special characters.");
      }
    });
  });
const lastName = Joi.string()
  .alphanum()
  .max(150)
  .min(3)
  .required()
  .label("Last name")
  .error(errors => {
    return errors.map(error => {
      switch (error.type) {
        case "string.min":
          return new Error("Last name must be at least 3 characters long.");
        case "string.max":
          return new Error("Last name must be no longer than 150 characters.");
        case "any.empty":
          return new Error("Last name is required.");
        case "string.alphanum":
          return new Error("Last name can't contain special characters.");
      }
    });
  });

exports.signUp = Joi.object().keys({
  firstName,
  lastName,
  email,
  password
});

exports.signIn = Joi.object().keys({
  email,
  password
});
