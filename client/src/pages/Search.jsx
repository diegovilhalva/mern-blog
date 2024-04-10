import { Button, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import PostCard from "../components/PostCard"


const Search = () => {

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort:'desc',
        category:'uncategorized',
    })

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const urLParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urLParams.get('searchTerm')
        const sortfromUrl = urLParams.get('sort')
        const categoryfromUrl = urLParams.get('category')
        if (searchTermFromUrl || sortfromUrl || categoryfromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortfromUrl,
                category: categoryfromUrl
            })
        }
        const fetchPost = async () => {
            setLoading(true)
            try {
                const searchQuery = urLParams.toString()
                const res = await fetch(`/api/post/getposts?${searchQuery}`)
                if (!res.ok) {
                    setLoading(false)
                    console.log(res)
                }
                if (res.ok) {
                    const data = await res.json()
                    setPosts(data.posts)
                    setLoading(false)
                    if (data.posts.length === 9) {
                        setShowMore(true)
                    } else {
                        showMore(false)
                    }
                }
            } catch (error) {

            }
        }
        fetchPost()
    }, [location.search])
    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc'
            setSidebarData({ ...sidebarData, sort: order })
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized'
            setSidebarData({ ...sidebarData, category })
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm',sidebarData.searchTerm)
        urlParams.set('sort',sidebarData.sort)
        urlParams.set('category',sidebarData.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts([...posts, ...data.posts]);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
    
      console.log(posts)
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Pesquisar por:</label>
                        <TextInput placeholder="Pesquisar em todo o site" id="searchTerm" type="text" value={sidebarData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-2 ">
                        <label className="font-semibold">Ordernar:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id="sort">
                            <option value="desc">Mais recentes</option>
                            <option value="asc">Mais antigo</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <label className="font-semibold">Categoria:</label>
                        <Select onChange={handleChange} value={sidebarData.category} id="category">
                            <option value="uncategorized">Selecionar categoria</option>
                            <option value="javascript">JavaScript</option>
                            <option value="reactjs">React.js</option>
                            <option value="nextjs">Next.js</option>
                            <option value="nodejs">Node.js</option>
                            <option value="webdevelopment">Desenvolvimento web</option>
                            <option value="sql">Sql</option>
                            <option value="vuejs">Vue.js</option>
                        </Select>
                    </div>
                    <Button type="submit" outline gradientDuoTone={'purpleToPink'}>Enviar</Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Reultados da pesquisa:</h1>
                <div className="p-3 flex flex-wrap gap-4">
                    {
                        !loading && posts.length === 0 && <p className="text-xl text-gray-500">
                            Nenhum resultado encontrado
                        </p>
                    }
                    {
                        loading && (
                            <p className="text-xl text-gray-500">Carregando...</p>
                        )
                    }
                    {
                        !loading &&  posts && posts.map((post) => (
                            <PostCard key={post._id} post={post}/>
                        ))
                    }
                    {
                        showMore && <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
                            Mostrar mais
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Search