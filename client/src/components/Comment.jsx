import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns";
import {ptBR} from "date-fns/locale"
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from "react-redux";
const Comment = ({ comment,onLike }) => {
    const [user, setUser] = useState({})
    const {currentUser} = useSelector((state) => state.user)

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
  
    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full bg-gray-200" />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs trucate">{user ? `@${user.username}`: 'Anonimo'}</span>
                    <span className="text-gray-500 text-xs">
                     há	{formatDistanceToNow(new Date(comment.createdAt),{locale:ptBR})} 
                    </span>
                </div>
                <p className="text-gray-500 mb-2">{comment.content}</p>
                <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2 ">
                    <button type="button" className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`} onClick={
                        () => onLike(comment._id)}>
                            
                        <FaThumbsUp className="text-sm"/>
                    </button>
                    <p className="text-gray-400">
                        {
                            comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'curtida' : 'curtidas')
                        }
                    </p>
                </div>
            </div> 
        </div>
    )
}

export default Comment