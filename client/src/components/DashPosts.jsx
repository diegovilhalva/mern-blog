import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {Table} from "flowbite-react"
import {Link} from "react-router-dom"

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setUserPosts(data.posts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (currentUser.isAdmin) {
      fetchPost()
    }

  }, [currentUser._id])
  console.log(userPosts)
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
                      <span className="font-medium text-red-500 hover:underline cursor-pointer">
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
          
          </>
        ) : (
          <p>Ainda não há posts</p>
        )}
    </div>
  )
}


export default DashPosts