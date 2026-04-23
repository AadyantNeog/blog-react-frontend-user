import { useEffect, useState } from 'react'
import { Post } from './Post';
import { Link } from 'react-router';

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

export function AllPosts() {
    const {data, error, loading} = useGetAllPosts();

    if(loading){
        return <div className="status-panel">Loading latest edition...</div>
    }
    if(error){
        return <div className="status-panel">Unable to load the front page.</div>
    }
    const posts = data.map((p) => {
        return <Post key={p.id} id={p.id} username={p.username} title={p.title} content={null} created_at={p.created_at}/>
    })
    return(
        <div className='AllPosts page-shell'>
            <header className="masthead">
                <div className="eyebrow">Daily Edition</div>
                <h1 className="masthead-title">The React Chronicle</h1>
                <div className="masthead-meta">
                    <span>Independent Web Dispatch</span>
                    <span>All the posts worth reading</span>
                </div>
            </header>

            <section className="section-bar">
                <div>
                    <div className="section-label">Top Stories</div>
                    <p className="section-copy">Fresh entries from the editorial desk.</p>
                </div>
                <Link className="button-link" to="/post">File a new story</Link>
            </section>

            <section className="posts-grid">
            {posts}
            </section>
        </div>
    )
}
