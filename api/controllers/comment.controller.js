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

export const getComments = async (req,res,next) => {
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        })
        res.status(200).json(comments)
    } catch (error) {
        
    }
}

export const likeComment = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)

        if(!comment){
            return next(erroHandler(404,"Comentário não encontrado"))
        }

        const userIndex = comment.likes.indexOf(req.user.id)
        if (userIndex === -1) {
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)
            
        }else{
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex,1)

        }
        await comment.save()
        res.status(200).json(comment);

    } catch (error) {
        next(error)
    }
}

export const editComment = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(erroHandler(404,"Comentário não encontrado"))
        }

        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(erroHandler(403,"Você não possui autorização para realizar esta requisição"))
        }
        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId,{
            content:req.body.content
        },{new:true})
        
        res.status(200).json(editedComment)
        
    } catch (error) {
        next(error)
    }
}