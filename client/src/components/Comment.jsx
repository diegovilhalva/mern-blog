import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale"
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
const Comment = ({ comment, onLike,onEdit }) => {
    const [user, setUser] = useState({})
    const [editedContent,setEditedContent] = useState(comment.content)
    const [isEditing, setIsEditing] = useState(false)
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [comment])
    const handleEdit = () => {
        setIsEditing(true)
        setEditedContent(comment.content)
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/edit/${comment._id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                        content:editedContent
                })

            })
            if(res.ok){
                setIsEditing(false)
                onEdit(comment,editedContent)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full bg-gray-200" />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs trucate">{user ? `@${user.username}` : 'Anonimo'}</span>
                    <span className="text-gray-500 text-xs">
                        há	{formatDistanceToNow(new Date(comment.createdAt), { locale: ptBR })}
                    </span>
                </div>
                {isEditing ? (<>
                    <Textarea
                        className='mb-2'
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className='flex justify-end gap-2 text-xs'>
                        <Button
                            type='button'
                            size='sm'
                            gradientDuoTone='purpleToBlue'
                            onClick={handleSave}
                        >
                            Salvar
                        </Button>
                        <Button
                            type='button'
                            size='sm'
                            gradientDuoTone='purpleToBlue'
                            outline
                            onClick={() => setIsEditing(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </>) : (
                    <>
                        <p className="text-gray-500 mb-2">{comment.content}</p>
                        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2 ">
                            <button type="button" className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`} onClick={
                                () => onLike(comment._id)}>

                                <FaThumbsUp className="text-sm" />
                            </button>
                            <p className="text-gray-400">
                                {
                                    comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'curtida' : 'curtidas')
                                }
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <button type="button" className="text-gray-400 hover:text-red-500" onClick={handleEdit}>
                                        Editar
                                    </button>
                                )
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Comment