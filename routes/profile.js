const Profile = require("../models/profile.js");
const auth = require("../middleware/auth.js");

const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

//Get My profile

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate("user")
      .populate("posts");

    if (!profile) {
      return res
        .status(404)
        .json({ message: "No profile found for this user" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get All profiles

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({})
      .populate("user", ["username", "profileImage", "fullname"])

    if (!profiles) {
      return res
        .status(404)
        .json({ message: "No profile found for this user" });
    }
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Profile

validateProfile = [
  check("username", "Username is required").not().isEmpty(),
  check("fullname", "Name is required").not().isEmpty(),
];

router.patch("/edit", [validateProfile, auth], async (req, res) => {
  try {
    const profileFields = { ...req.body };
    const newProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate("user", ["username", "fullname", "profileImage"]);
    await newProfile.save();
    res.json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get Profile by id

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findOne({user : id}).populate("user", [
      "username",
      "fullname",
      "profileImage",
    ]).populate("posts");
    if (!profile) {
      return res
        .status(404)
        .json({ message: "No profile found for this user" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id/follow", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await Profile.findById(id);
    const myProfile = await Profile.findOne({ user: req.user.id });

    if (userProfile.followers.indexOf(req.user.id) !== -1) {
      userProfile.followers.splice(
        userProfile.followers.indexOf(req.user.id),
        1
      );
      myProfile.following.splice(
        myProfile.following.indexOf(userProfile.user),
        1
      );
      await myProfile.save();
      await userProfile.save();
    } else {
      userProfile.followers.unshift(req.user.id);
      myProfile.following.unshift(userProfile.user);

      await myProfile.save();
      await userProfile.save();
    }

    res.json(userProfile.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
