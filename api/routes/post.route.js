import  express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import { create, deletePost, getPosts } from "../controllers/post.controller.js"
const router = express.Router()

router.get('/getposts/',getPosts)

router.post('/create/',verifyToken,create)

router.delete('/deletepost/:postId/:userId',verifyToken,deletePost)

export default router