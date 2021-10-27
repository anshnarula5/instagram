const express = require("express");
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");
const Profile = require("../models/profile.js");

const router = express.Router();

//Post route

const validatePost = [check("image", "Image is required").not().isEmpty()];

router.post("/", [validatePost, auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = new Post(req.body);
    const profile = await Profile.findOne({ user: req.user.id });
    profile.posts.unshift(post);
    post.user = req.user.id;
    await post.save();
    await profile.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all posts

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate("user", ["profileImage", "username"]);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Like a post

router.patch("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
      await post.save();
      res.json(post.likes);
    } else {
      
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// comment on a post

const validateComment = [
  check("text", "Comment is required").trim().not().isEmpty(),
];

router.post("/comment/:id", [validateComment, auth], async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { text } = req.body;
  try {
    const post = await Post.findById(id)
    const user = await User.findById(req.user.id).select("-password")
    if (!post) {
      res.status(400).json({ message: "No post found" });
    }
    const comment = { username : user.username, profileImage : user.profileImage , text, userId : user._id };
    post.comments.unshift(comment);
    await post.save();
    res.json(post.comments);
    console.log(post.comments)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Like a comment

router.patch("/:id/comment/:commentId/like", auth, async (req, res) => {
  const { id, commentId } = req.params;
  try {
    const post = await Post.findById(id);
    let comment = post.comments.find((comment) => comment.id === commentId);
    if (comment) {
      const prevLike = comment.likes.find(
        (like) => like._id.toString() === req.user.id
      );
      if (prevLike) {
        comment.likes.splice(comment.likes.indexOf(req.user.id), 1);
      } else {
        comment.likes.unshift(req.user.id);
      }
    } else {
      res.status(404).json({ message: "no comment found" });
    }
    await post.save();
    res.json(comment.likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a comment

router.delete("/:id/comment/:commentId", auth, async (req, res) => {
  const { id, commentId } = req.params;
  try {
    const post = await Post.findById(id);
    let comment = post.comments.find((comment) => comment.id === commentId);
    if (comment) {
      comment.remove();
    } else {
      res.status(404).json({ message: "no comment found" });
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get post by id

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("user", [
      "profileImage",
      "username",
    ]);
    if (!post) {
      res.status(404).json({ message: "no post found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No Post found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();
    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.log(error.message);
    if (!id) {
      return res.status(404).json({ msg: "No Post found" });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
