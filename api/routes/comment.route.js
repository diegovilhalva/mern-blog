import express from "express"
import { createComment, getComments } from "../controllers/comment.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post('/create',verifyToken,createComment)

router.get('/getpostcomments/:postId',getComments)

export default router