const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const Profile = require("../models/profile")

const jwtsecret = config.get("jwtsecret");

const router = express.Router();

//Registering a user

const validator = [
  check("email", "Invalid email").isEmail(),
  check("fullname", "Please enter your full name").trim().not().isEmpty(),
  check("username", "Username should not contain any spaces")
    .not()
    .isEmpty()
    .custom((value) => !/\s/.test(value)),
  check("password", "Password should be of atleast 6 characters")
    .trim()
    .isLength({
      min: 6,
    }),
];

router.post("/", validator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, fullname, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: [{ msg: "User already exists" }] });
    }
    const newUser = new User({ username, fullname, email, password });
    //bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;
    await newUser.save();
    const profile = new Profile({user : newUser.id})
    await profile.save()
    //jwt
    const payload = {
      user: {
        id: newUser.id,
      },
    };
    jwt.sign(payload, jwtsecret , {expiresIn: 360000}, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
