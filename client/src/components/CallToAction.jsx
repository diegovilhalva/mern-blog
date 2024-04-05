import { Button } from "flowbite-react"


const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
        <div className="flex-1 justify-center flex flex-col" >
            <h2 className="text-2xl">
                Quer aprender mais sobre JavaScript?
            </h2>
            <p className="text-gray-500 my-2">acesse nosso site com mais de 100 projetos práticos</p>
            <Button gradientDuoTone={'purpleToPink'} className="rounded-tl-xl rounded-bl-none">
                <a href="#" target="_blank">Saiba mais</a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" alt="" />
        </div>
    </div>
  )
}

export default CallToAction