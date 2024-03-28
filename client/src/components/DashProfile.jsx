import { Button, TextInput } from "flowbite-react"
import {  useSelector } from "react-redux"

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Perfil</h1>
        <form className="flex flex-col gap-4">
           
            <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                <img src={currentUser.profilePicture} alt={currentUser.username}  className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "/>
            </div>
            <TextInput type="text" id="username" placeholder="Usuário" defaultValue={currentUser.username}/>
            <TextInput type="email" id="email" placeholder="E-mail" defaultValue={currentUser.email}/>
            <TextInput type="password" id="password" placeholder="Senha" />
            <Button type="submit" gradientDuoTone={'purpleToBlue'} outline >
                Atualizar
            </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Deletar conta</span>
            <span className="cursor-pointer">Sair</span>
        </div>
    </div>
  )
}

export default DashProfile