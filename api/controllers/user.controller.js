import { erroHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js" 


export const test = (req,res) => {
    res.send("User is working")
}


export const updateUser = async (req,res,next) => {
    if (req.user.id !== req.params.userId) {
        return next(erroHandler(401,"Você não tem permissão para acessar este recurso."))
    }

    if (req.body.password) {
        if (req.body.password.length < 8 ) {
            return next(erroHandler(400,'A senha deve possuir no mínimo 8 caracters'))
        }

        req.body.password = bcryptjs.hashSync(req.body.password,10)
        
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(erroHandler(400,"Nome de usuário deve possuir no mínimo 8 caracteres"))
        }
        if (req.body.username.includes(' ')) {
            return next(erroHandler(400,"Nome de usuário não pode ter espaços vazios"))
        }

        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(erroHandler(400,"Nome de usuário dever ser em letras minúsculas"))
        }

        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(erroHandler(400,'Nome de usuário deve conter apenas letras e números'))
            
        }
    }
            try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password
                },
            },{new:true})
            const {password,...rest} = updateUser._doc
            res.status(200).json(rest)
        } catch (error) {
            console.log(error)
        }
    
    
}

export const deleteUser = async (req,res,next) => {
    if(req.user.id !== req.params.userId){
        return next(erroHandler(403,"Você não possui autorização para acessar este recurso"))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("Usuário deletado com sucesso")
    } catch (error) {
        next(error)
    }
}

export const signOut =  (req,res,next) => {
    try {
        res.clearCookie('access_token').status(200).json('Usuário deslogado com sucesso!')

    } catch (error) {
        next(error)
    }
}

export const getUsers  = async (req,res,next) => {
    if (!req.user.isAdmin ) {
        return next(erroHandler(403,"Apenas administradores podem realizar essa requisição"))
    }
    try {
     const startIndex = parseInt(req.query.startIndex)  || 0
     const limit = parseInt(req.query.limit) || 9
     const sortDirection = req.query.sort === 'asc' ? 1 : -1

     const users = await User.find()
                            .sort({createdAt:sortDirection})
                            .skip(startIndex)
                            .limit(limit)

       const usersWithoutPassword = users.map((user) => {
            const {password,...rest} = user._doc
            return rest
       })       
       
       const totalUsers = await User.countDocuments()

       const now  = new Date()
       const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        res.status(200).json({
            users:usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        })

    } catch (error) {
        next(error)
    }
}