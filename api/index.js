import express from "express"
import mongoose from "mongoose"
import doteenv from "dotenv"

doteenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Banco de dados conectado")
})
.catch((err) => {
    console.log(`Ocorreu um erro ao conectar ao banco de dados ${err}`)
})

const app = express()


app.listen(5000,() => {
    console.log('Servidor rodando na porta 5000')
})