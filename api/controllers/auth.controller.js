import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { erroHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
export const signUp = async (req, res, next) => {
   const { username, email, password } = req.body
   if (!username || !email || !password || username === '' || email === "" || password === "") {
      next(erroHandler(400, "Por favor, preencha todos os campos"))
   }

   const hashPassword = bcryptjs.hashSync(password, 10)
   const newUser = new User({
      username,
      password: hashPassword,
      email
   })



   try {
      await newUser.save()
      res.status(201).json('Usuário criado com sucesso!')
   } catch (error) {
      next(error)
   }




}

export const signIn = async (req, res, next) => {
   const { email, password } = req.body
   if (!email || !password || email === '' || password === "") {
      next(erroHandler(400, "Por favor, preencha todos os campos"))
   }

   try {
      const validUser = await User.findOne({ email })
      if (!validUser) {
       return  next(erroHandler(404, "Usuário não encontrado"))
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password)

      if (!validPassword) {
         return next(erroHandler(400, "Usuário ou senha incorreta"))
      }

      const token = jwt.sign({
         id: validUser._id
      }, process.env.JWT_SECRET)

      const {password:pass,...rest} = validUser._doc

      res.status(200).cookie('access_token', token, {
         httpOnly: true,

      }).json(rest)


   } catch (error) {
      next(error)
   }
}