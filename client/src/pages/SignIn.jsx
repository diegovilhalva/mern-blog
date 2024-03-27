import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  useDispatch,useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Por favor, preencha todos os campos do formulário."))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
      
    }
  };
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
          <p className="text-sm mt-5">Este é um projeto de demonstração. Sinta-se à vontade para fazer login utilizando seu e-mail ou sua conta do Google.</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                ) : "Fazer login"
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Ainda não possui uma conta?</span>
            <Link to="/sign-up" className="text-blue-500">
              Criar conta
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

export default SignIn