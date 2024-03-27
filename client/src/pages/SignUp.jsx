import { Link,useNavigate } from "react-router-dom"
import {Alert, Button, Label,Spinner,TextInput} from "flowbite-react"
import { useState } from "react"
const SignUp = () => {

  const [formData,setFormData] = useState({})
  const [errorMessage,setErrorMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
      setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  if(!formData.username || !formData.email || !formData.password){
    return setErrorMessage("Por favor, preencha todos os campos do formulário.")
  }
  try {
    setLoading(true)
    setErrorMessage(null)
    const res = await fetch('/api/auth/signup',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    })
    
    const data = await res.json()
    if(data.success === false){
      return setErrorMessage(data.message)
    }
    setLoading(false)

    if(res.ok){
      navigate("/sign-in")
    }
  } catch (error) {
    setErrorMessage(error.message)
  }
 }
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                  <Label value="Usuário" />
                  <TextInput type="text" placeholder="Usuário" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="E-mail" />
              <TextInput type="email" placeholder="Digite seu e-mail" id="email" onChange={handleChange} />
            </div>
            <div>
                <Label value="Senha" />
                <TextInput type="password"   placeholder="Digite sua senha" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" disabled={loading} type="submit" >
              {
                loading ? (
                 <>
                   <Spinner size='sm'/>
                  <span className="pl-3">Carregando...</span>
                 </>
                ) : "Criar conta"
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Já possui uma conta?</span>
            <Link to="/sign-in" className="text-blue-500">
              Fazer login
            </Link>
          </div>
          {
            errorMessage &&  (
              <Alert  className="mt-5" color="failure" >{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp