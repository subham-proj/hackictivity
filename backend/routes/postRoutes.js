import express from "express";
const router = express.Router();
import { addPost, getPost, deletePost } from "../controllers/postController.js";
import { protect, admin } from "../middleware/auth.js";

router.route("/").post(protect, addPost).get(protect, getPost);

router.route("/:id").delete(protect, deletePost);

export default router;
