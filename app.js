import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express()

import authUser from "./routes/auth.routes.js"
import socialPost from "./routes/socialPost.routes.js"

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authUser)
app.use('/api/v1/social', socialPost)

export default app