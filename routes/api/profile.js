const express = require("express");

const router = express.Router();

//@route GET api/profile/test
//@dsc tests profile route
//@access public
router.get("/test", (req, res) =>
  res.json({ msg: "hello world from profile" })
);

module.exports = router;
