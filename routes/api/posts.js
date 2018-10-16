const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../models/Post");
const Profile = require("../models/Profile");
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@dsc tests posts route
//@access public
router.get("/test", (req, res) => res.json({ msg: "hello world from posts" }));

//@route GET api/posts
//@dsc gets posts
//@access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ postsnotfound: "No posts found" }));
});

//@route GET api/posts/:id
//@dsc gets posts by id
//@access public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ postnotfound: "No post found by that user" })
    );
});

//@route POST api/posts
//@dsc Create Posts
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE api/posts/:id
//@dsc deletes a post by id
//@access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      //find post
      Post.findById(req.params.id)
        .then(post => {
          //if post user doesn't match the logged in user
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ noauth: "user not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "No post found by that user" })
        );
    });
  }
);

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ postnotfound: "No post found by that user" })
    );
});

module.exports = router;
