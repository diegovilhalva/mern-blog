import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth"
import { app } from "../firebase"
import {  useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"
import { useNavigate } from "react-router-dom"
const OAuth = () => {
    const auth = getAuth(app)
    const dispacth = useDispatch()
    const navigate = useNavigate()
   const  handleGoogleClick = async () => {
        
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultsFromGoogle = await signInWithPopup(auth,provider)
            const res =await fetch('/api/auth/google',{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl:resultsFromGoogle.user.photoURL,
                })
            })

            const data = res.json()
            if (res.ok) {
                dispacth(signInSuccess(data))
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type="button" gradientDuoTone={'pinkToOrange'} outline onClick={handleGoogleClick}><AiFillGoogleCircle className="h-6 w-6 mr-2"/> Entrar com o Google</Button>
  )
}

export default OAuth