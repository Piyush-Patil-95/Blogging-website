import express from "express";
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, getMyBlogs } from '../controllers/blogController.js';
import upload from "../middleware/uploads.js";
import ensureAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.route("/")
    .get(getBlogs)
    .post(ensureAuthenticated,upload.single("image"),createBlog)

router.get("/myblogs", ensureAuthenticated, getMyBlogs);

router.route("/:id")
    .get(getBlog)
    .put(upload.single("image"),updateBlog)
    .delete(deleteBlog)

export default router;