import jwt from "jsonwebtoken"

import {erroHandler} from "./error.js"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(erroHandler(401,"O usuário não possui um token de autenticação válido."))
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if (err) {
            return next("O usuário não possui um token de autenticação válido.")
        }

        req.user = user
        next()
    })

}