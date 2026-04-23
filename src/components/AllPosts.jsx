import { useEffect, useState } from 'react'
import { Post } from './Post';
import { Link } from 'react-router';
import { SessionNav } from './SessionNav';

function useGetAllPosts(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/posts", {
            headers: token
                ? {
                    Authorization: `Bearer ${token}`
                }
                : {}
        })
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
        return <div className="status-panel">Loading posts...</div>
    }
    if(error){
        return <div className="status-panel">Unable to load the posts feed.</div>
    }
    const renderedPosts = data.map((p) => {
        return (
            <Post
                key={p.id}
                id={p.id}
                username={p.username}
                title={p.title}
                content={null}
                created_at={p.created_at}
                likes_count={p.likes_count}
                liked_by_user={p.liked_by_user}
                showLikeButton={false}
            />
        )
    })
    return(
        <div className='AllPosts page-shell'>
            <header className="masthead">
                <div className="masthead-top">
                    <SessionNav />
                </div>
                <h1 className="masthead-title">The React Forum</h1>
                <div className="masthead-meta">
                    <span>Community blog and discussion space</span>
                    <span>Browse the latest posts from members</span>
                </div>
            </header>

            <section className="section-bar">
                <div>
                    <div className="section-label">Recent Posts</div>
                    <p className="section-copy">New thoughts, updates, and conversations from the community.</p>
                </div>
                <Link className="button-link" to="/post">Create a new post</Link>
            </section>

            <section className="posts-grid">
            {renderedPosts}
            </section>
        </div>
    )
}
