import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// desc   : Add a new post
// route  : POST /api/post
// access : Private/user
const addPost = asyncHandler(async (req, res) => {
  const { text, user } = req.body;

  const post = await Post.create({
    text,
    user,
  });

  if (user) {
    res.status(201).json({
      _id: post._id,
      text: post.text,
      user: post.user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc   : get all posts
// route  : GET /api/post
// access : Private/user
const getPost = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const posts = await Post.find({ user });
  res.json(posts);
});

// desc   : delete a posts
// route  : DELETE /api/post
// access : Private/user
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: "Post removed successfully!" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { addPost, getPost, deletePost };
