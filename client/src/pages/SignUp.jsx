import { Link } from "react-router-dom"
import {Button, Label,TextInput} from "flowbite-react"
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        <div className="flex-1">

          <Link
            to='/'
          className='font-bold dark:text-white text-4xl '
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Diego's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">Este é um projeto de demonstração. Sinta-se à vontade para criar uma conta utilizando seu e-mail ou sua conta do Google.</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
                  <Label value="Usuário" />
                  <TextInput type="text" placeholder="Usuário" id="username" />
            </div>
            <div>
              <Label value="E-mail" />
              <TextInput type="email" placeholder="Digite seu e-mail" id="email" />
            </div>
            <div>
                <Label value="Senha" />
                <TextInput type="password"  placeholder="Digite sua senha" id="password"/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" >Criar conta</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Já possui uma conta?</span>
            <Link to="/sign-in" className="text-blue-500">
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp