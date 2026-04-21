import { useEffect, useState } from 'react'
import { Post } from './components/Post';

function useGetAllPosts(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3000/posts")
        .then((response) => {
            if(response.status >= 400){
                throw new Error("Server error")
            }
            return response.json()
        })
        .then((response) => {
            setData(response.posts);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => setLoading(false));
    },[])

    return {data,error,loading}
}

function App() {
    const {data, error, loading} = useGetAllPosts();

    if(loading){
        return <p>Loading</p>
    }
    if(error){
        return <p>Network Error</p>
    }
    const posts = data.map((p) => {
        return <Post key={p.id} id={p.id} user_id={p.user_id} title={p.title} content={null} created_at={p.created_at}/>
    })
    return(
        <>
            {posts}
        </>
    )
}

export default App
