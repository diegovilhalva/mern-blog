import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {Button, Modal, Table} from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import {FaCheck,FaTimes} from "react-icons/fa"

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [users,setUsers] = useState([])
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] =useState(false)
  const [userIdToDelete,setUserIdToDelete] = useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users)
          if (data.users.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (currentUser.isAdmin) {
      fetchUsers()
    }

  }, [currentUser._id])
  const handleShowMore  = async() => {
    const startIndex = users.length

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)

      const data = await res.json()

      if (res.ok) {
        setUsers((prev) => [...prev,...data.users])
        if (data.users.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    } 
  }

  const handleDeleteuser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
            method:"DELETE"
        })
        const data = await res.json()

        if(res.ok){
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
            setShowModal(false)
        }else{
            console.log(data.message)
        }
    } catch (error) {
        console.log(error.message)
    }
  }


  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin & users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Criado em</Table.HeadCell>
                <Table.HeadCell>Imagem</Table.HeadCell>
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>E-mail</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Deletar</Table.HeadCell>
                
              </Table.Head>
              {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full" />
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                    
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                     {user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500" />)}
                  </Table.Cell>
                  <Table.Cell>
                  <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Deletar
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
            </Table>
            {showMore && (
              <button className="w-full self-center text-teal-500 text-sm py-7" onClick={handleShowMore}>
                  Carregar mais
              </button>
            )}
          
          </>
        ) : (
          <p>Ainda não há usuários</p>
        )}
          <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Você quer mesmo deletar este usuário?</h3>
                <div className="flex justify-center gap-4">
                  <Button color={'failure'} onClick={handleDeleteuser} >
                    Sim
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>Cancelar</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </div>
  )
}


export default DashUsers

