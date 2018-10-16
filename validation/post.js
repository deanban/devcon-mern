const validator = require("validator");
const isEmpty = require("./is-empty");
// import isEmpty from "./is-empty";

module.exports = function validatePostInput(data) {
  let errors = {};

  //   data.name = !isEmpty(data.name) ? data.name : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "post must be between 10 and 300 chars";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
