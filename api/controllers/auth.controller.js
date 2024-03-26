import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signUp = async (req,res) => {
   const {username,email,password} = req.body
   if(!username || !email || !password || username === '' || email === "" || password === ""){
        return res.status(400).json({message:'Por favor, preencha todos os campos'})
   }

   const hashPassword =  bcryptjs.hashSync(password,10)
     const newUser = new User({
          username,
          password:hashPassword,
          email
     })

   try {
    await newUser.save()
    res.status(201).json({message:'Usuário criado com sucesso!'})
   } catch (error) {
        res.status(500).json('Ocorreu um erro,tente novamente mais tarde')
   }

 

   
}

export const signIn = async(req,res) => {
const {email,password} = req.body
    res.json(email)
}