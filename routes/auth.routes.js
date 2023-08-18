import express from "express";
import { userCreate, login, updateProfile, protectedUser } from "../controllers/auth.controllers.js";

const router = express.Router()


router.post('/login', login)
router.post('/register', userCreate)
router.post('/protected-user', protectedUser)
router.patch('/update-profile/:id', updateProfile)

export default router