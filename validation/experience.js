const validator = require("validator");
const isEmpty = require("./is-empty");
// import isEmpty from "./is-empty";

module.exports = function validateExperienceInput(data) {
  let errors = {};

  //   data.name = !isEmpty(data.name) ? data.name : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  //   data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "title is required";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "company is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
