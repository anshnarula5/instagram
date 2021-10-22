const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");
const Post = require("./post");

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: User,
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: User,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  saves: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
