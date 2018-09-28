const express = require("express");

const router = express.Router();

//@route GET api/posts/test
//@dsc tests posts route
//@access public
router.get("/test", (req, res) => res.json({ msg: "hello world from posts" }));

module.exports = router;
