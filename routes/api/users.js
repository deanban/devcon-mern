const express = require("express");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//load input validation
const validateRegisterInput = require("../../validation/register");

const secretKey = require("../../config/keys").secretKey;

const router = express.Router();

//@route GET api/users/test
//@dsc tests users route
//@access public
router.get("/test", (req, res) => res.json({ msg: "hello world from users" }));

//@route POST api/users/register
//@dsc register users route
//@access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exits";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST api/users/login
//@dsc login users route
//@access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //try to find user
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    //compare password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        //create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
        // res.json({ msg: "success" });
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

//@route GET api/users/current
//@dsc current users route
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.id, email: req.user.email });
  }
);

module.exports = router;
