import Comment from "../models/comment.model.js"
import { erroHandler } from "../utils/error.js"

export const createComment = async (req,res,next) => {
    try {
        const {content,postId,userId} = req.body

        if (userId !== req.user.id) {
            return next(erroHandler(403,"Você não possui autorização para realizar essa requisição"))
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })

        await newComment.save()

        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}