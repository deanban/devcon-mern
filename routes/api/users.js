const express = require("express");

const router = express.Router();

//@route GET api/users/test
//@dsc tests users route
//@access public
router.get("/test", (req, res) => res.json({ msg: "hello world from users" }));

module.exports = router;
