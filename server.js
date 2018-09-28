const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("***********DB Connected to mLab***********"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("hello world!"));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);
//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`***********Server Running on Port ${port}***********`)
);
