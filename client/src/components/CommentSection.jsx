import { Alert, Button, TextInput, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Comment from "./Comment"

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [comment, setComment] = useState("")
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
      })

      const data = await res.json()
      if (res.ok) {
        setComment('')
        setError(null)
        setComments([data,...comments])
      }
    } catch (error) {
      setError(error.message)
    }

  }
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`)
        const data = await res.json()

        if (res.ok) {
          setComments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
  }, [postId])
  console.log(comments)
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Logado como: </p>
          <img src={currentUser.profilePicture} className="h-5 w-5 object-cover rounded-full" alt="" />
          <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-600 hover:underline">
            @{currentUser.username}
          </Link>
        </div>) :
        (
          <div className="text-sm text-teal-500 my-5 flex gap-1">
            Apenas usuários logados podem comentar
            <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
              Fazer login
            </Link>
          </div>
        )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
          <Textarea placeholder="Adicionar comentário" rows={3} maxLength={'200'} onChange={(e) => setComment(e.target.value)} value={comment} />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">{200 - comment.length} {200 - comment.length !== 1 ? 'caracteres restantes' : 'carectere resteante'}</p>
            <Button outline gradientDuoTone={'purpleToBlue'} type="submit">
              Enviar
            </Button>
          </div>
          {error && <Alert color={'failure'}>{error}</Alert>}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">Ainda não há comentários</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comentários</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            
            <Comment key={comment._id} comment={comment}/>
          ))}
        </>
      )}
    </div>
  )
}

export default CommentSection