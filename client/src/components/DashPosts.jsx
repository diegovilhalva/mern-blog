import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {Button, Modal, Table} from "flowbite-react"
import {Link} from "react-router-dom"
import { HiOutlineExclamationCircle } from "react-icons/hi"

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] =useState(false)
  const [postIdToDelete,setPostIdToDelete] = useState(null)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setUserPosts(data.posts)
          if (data.posts.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (currentUser.isAdmin) {
      fetchPost()
    }

  }, [currentUser._id])
  const handleShowMore  = async() => {
    const startIndex = userPosts.length

    try {
      const res = await fetch(`/api/post/getposts?userid=${currentUser._id}&startIndex=${startIndex}`)

      const data = await res.json()

      if (res.ok) {
        setUserPosts((prev) => [...prev,...data.posts])
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    } 
  }

  const handleDeletePost = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
        method:"DELETE",
      })
      const data = await res.json()

      if (!res.ok) {
        console.log(data.message)
      }else{
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin & userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Atualizado em</Table.HeadCell>
                <Table.HeadCell>Imagem</Table.HeadCell>
                <Table.HeadCell>Título</Table.HeadCell>
                <Table.HeadCell>Categoria</Table.HeadCell>
                <Table.HeadCell>Deletar</Table.HeadCell>
                <Table.HeadCell>
                  <span className="">Editar</span>
                </Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title}  className="h-10 w-20 object-cover bg-gray-500"/>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id)
                      }} className="font-medium text-red-500 hover:underline cursor-pointer">
                        Deletar
                      </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`} className="text-teal-500 hover:underline">
                      <span>Editar</span>
                    </Link>
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
          <p>Ainda não há posts</p>
        )}
          <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Você quer mesmo deletar este post?</h3>
                <div className="flex justify-center gap-4">
                  <Button color={'failure'} onClick={handleDeletePost}>
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


export default DashPosts