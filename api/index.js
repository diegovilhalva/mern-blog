import express from "express"
import mongoose from "mongoose"
import doteenv from "dotenv"
import userRoutes from "./routes/user.route.js"

doteenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Banco de dados conectado")
})
.catch((err) => {
    console.log(`Ocorreu um erro ao conectar ao banco de dados ${err}`)
})

const app = express()


app.use("/api/user",userRoutes)


app.listen(5000,() => {
    console.log('Servidor rodando na porta 5000')
})

