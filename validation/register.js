const validator = require("validator");
const isEmpty = require("./is-empty");
// import isEmpty from "./is-empty";

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 chars";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
