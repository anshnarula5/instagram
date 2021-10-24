const jwt = require("jsonwebtoken");
const config = require("config")
const bcrypt = require("bcryptjs");
const express = require("express");
const {check, validationResult} = require("express-validator");

const User = require("../models/user");
const auth = require("../middleware/auth.js")

const router = express.Router();

//Get user

router.get("/", auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password")
      res.json(user)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

const loginValidator = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password should be of atleast 6 characters")
    .trim()
    .isLength({
      min: 6,
    }),
];

//Login

router.post("/", loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }
    const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
      res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }
      const payload = {
          user: {
              id : user.id
          }
      }
      jwt.sign(payload, config.get("jwtsecret"), {expiresIn: 360000}, (err, token) => {
          if(err) throw err
          res.json({token})
      })
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router
