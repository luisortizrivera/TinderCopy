const express = require("express");
const router = express.Router();
const User = require("../models/UsersModel");
const Image = require("../models/ImagesModel");
const jwt = require("jsonwebtoken");
// const { getMatches } = require('./matches');
const passport = require("passport");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const {
  validateUser,
  validateLogin,
} = require("../configFiles/validationRules");

router.get("/list", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/getRandomUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res, _) => {
    try {
      const currentUser = req.user;
      const user = await User.getRandomUser(currentUser._id);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/getUserImage/:id", async (req, res) => {
  try {
    const userImage = await Image.getImageById(req.params.id);
    const base64Image = Buffer.from(userImage.profileImg).toString("base64");
    res.send(base64Image);
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", validateUser, async (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(400).json({ errors: errors });

  const newUser = new User({
    Name: req.body.name,
    Surname: req.body.surname,
    Email: req.body.email,
    Password: req.body.password,
    Bio: req.body.bio,
  });
  console.log(newUser);
  const profileImg = Buffer.from(
    req.body.profileImg.split(";base64,").pop(),
    "base64"
  );
  try {
    const user = await User.addUser(newUser, profileImg);
    return res.json({ success: true, msg: "User registered", user });
  } catch (err) {
    if (err.name === "ValidationError") {
      errors.push({ msg: err.message });
      return res.status(400).json({ errors: errors });
    }
    return res.json({
      success: false,
      msg: "Failed to register user",
      error: err,
    });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req).array();
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ Email: email });
    if (!user) {
      errors.push({ msg: "User not found" });
      return res.status(401).json({ errors: errors });
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      errors.push({ msg: "Incorrect password" });
      return res.status(401).json({ errors: errors });
    }

    const payload = { email: user.Email };

    jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ success: true, token });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
