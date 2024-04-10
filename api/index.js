import express from "express"
import mongoose from "mongoose"
import doteenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import path from "path"




doteenv.config()



mongoose.connect(process.env.MONGO).then(() => {
    console.log("Banco de dados conectado")
})
.catch((err) => {
    console.log(`Ocorreu um erro ao conectar ao banco de dados ${err}`)
})

const __dirname = path.resolve()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
app.use("/api/comment",commentRoutes)

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Houve um erro interno no servidor. Por favor, tente novamente mais tarde."
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(5000,() => {
    console.log('Servidor rodando na porta 5000')
})

