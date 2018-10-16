const validator = require("validator");
const isEmpty = require("./is-empty");
// import isEmpty from "./is-empty";

module.exports = function validateEducationInput(data) {
  let errors = {};

  //   data.name = !isEmpty(data.name) ? data.name : "";
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fos = !isEmpty(data.fos) ? data.fos : "";
  //   data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "school is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree is required";
  }
  if (validator.isEmpty(data.fos)) {
    errors.fos = "field of study is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
