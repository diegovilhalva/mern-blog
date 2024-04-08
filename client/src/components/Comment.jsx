import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns";
import {ptBR} from "date-fns/locale"
const Comment = ({ comment }) => {
    const [user, setUser] = useState({})
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
            </div> 
        </div>
    )
}

export default Comment