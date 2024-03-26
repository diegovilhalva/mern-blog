import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FooterComponent from "./components/Footer"

function App() {
  
  return (

    <BrowserRouter>
    <Header/>
    <Routes>
    <Route />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dashboard' element={<DashBoard/>} />
        <Route path="/projects" element={<Projects/>}/>
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
