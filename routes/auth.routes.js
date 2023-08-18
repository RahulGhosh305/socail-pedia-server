import express from "express";
import { userCreate, login, updateProfile } from "../controllers/auth.controllers.js";

const router = express.Router()


router.post('/login', login)
router.post('/register', userCreate)
router.patch('/update-profile/:id', updateProfile)

export default router