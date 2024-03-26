import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { erroHandler } from "../utils/error.js"

export const signUp = async (req,res,next) => {
   const {username,email,password} = req.body
   if(!username || !email || !password || username === '' || email === "" || password === ""){
        next(erroHandler(400,"Por favor, preencha todos os campos"))
   }

   const hashPassword =  bcryptjs.hashSync(password,10)
     const newUser = new User({
          username,
          password:hashPassword,
          email
     })
  


   try {
    await newUser.save()
    res.status(201).json('Usuário criado com sucesso!')
   } catch (error) {
      next(error)
   }

 

   
}

export const signIn = async(req,res) => {
const {email,password} = req.body
    res.json(email)
}