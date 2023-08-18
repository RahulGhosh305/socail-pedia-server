import express from "express";
import { contentPost, getPost, addComment, addLike } from "../controllers/socialPosts.controllers.js";

const router = express.Router()


router.get('/get', getPost)
router.post('/post', contentPost)
router.post('/add-comment/:id', addComment)
router.patch('/add-like/:id', addLike)

export default router