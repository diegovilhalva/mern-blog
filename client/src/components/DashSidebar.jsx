import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi"
import { useDispatch,useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { signoutSuccess } from "../redux/user/userSlice"
import { current } from "@reduxjs/toolkit"

const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')
    const {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    const handleSignOut = async () => {
        try {
          const res = await fetch('/api/user/signout',{
            method:"POST"
          })
    
          const data = await res.json()
    
          if (!res.ok) {
            console.log(data.message)
          }else{
            dispatch(signoutSuccess())
          }
        } catch (error) {
          console.log(error.message)
        }
     }
    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor={'dark'} as='div'>
                            Meu Perfil
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                      <Link to='/dashboard?tab=posts'>
                                <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                as={'div'}
                                >
                                    Posts
                                </Sidebar.Item>
                      </Link>
                      
                      

                    )}
                      {currentUser.isAdmin && (
                      <Link to='/dashboard?tab=users'>
                                <Sidebar.Item
                                active={tab === 'users'}
                                icon={HiOutlineUserGroup}
                                as={'div'}
                                >
                                    Usuários
                                </Sidebar.Item>
                      </Link>
                      
                      

                    )}
                   

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut} >
                        Sair
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar

