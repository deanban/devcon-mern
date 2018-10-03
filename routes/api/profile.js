const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require(".././models/Profile");
const User = require(".././models/User");

//@route GET api/profile/test
//@dsc tests profile route
//@access public
router.get("/test", (req, res) =>
  res.json({ msg: "hello world from profile" })
);

//@route GET api/profile
//@dsc gets current user profile
//@access private

module.exports = router;
