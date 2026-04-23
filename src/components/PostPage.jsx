import { useParams } from "react-router";
import { Link } from 'react-router'
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { SubmitComment } from "./SubmitComment";
export function PostPage(){

    const params = useParams();
    const postid = params.postid;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);   
    
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                setNotFound(false);

                const [postRes, commentsRes] = await Promise.all([
                    fetch(`http://localhost:3000/posts/${postid}`, { signal: controller.signal }),
                    fetch(`http://localhost:3000/posts/${postid}/comments`, { signal: controller.signal })
                ]);

                if (!postRes.ok || !commentsRes.ok) {
                    throw new Error("Server error");
                }

                const postData = await postRes.json();
                const commentsData = await commentsRes.json();
                const selectedPost = postData.post[0];

                if (!selectedPost) {
                    setPost(null);
                    setComments([]);
                    setNotFound(true);
                    return;
                }

                setPost(selectedPost);
                setComments(commentsData.comments);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [postid]);
    
    if(loading){
        return <div className="status-panel">Preparing article...</div>
    }
    if(error){
        return <div className="status-panel">Unable to load this article.</div>
    }
    if(notFound){
        return (
            <div className="PostPage page-shell">
                <header className="article-header">
                    <Link className="inline-link" to="/posts">Back to front page</Link>
                    <p className="empty-state">Post not found.</p>
                </header>
            </div>
        )
    }
    const allComments = comments.map((c) => {
        return <Comment key={c.id} user_id={c.user_id} content={c.content} created_at={c.created_at} />
    })
    return(
        
        <div className="PostPage page-shell">
            <header className="article-header">
                <div className="eyebrow">Article Archive</div>
                <Link className="inline-link" to="/posts">Back to front page</Link>
            </header>

            <div className="article-layout">
                <main className="article-main">
                    <Post id={post.id} user_id={post.user_id} title={post.title} content={post.content} created_at={post.created_at} />
                </main>

                <aside className="article-sidebar">
                    <div className="section-label">Letters & Responses</div>
                    <p className="section-copy">Reader commentary on the story.</p>
                    <div className="comments-stack">
                        {allComments.length > 0 ? allComments : <p className="empty-state">No comments yet.</p>}
                    </div>
                    <SubmitComment postid={postid} updateComments={(comment) => setComments(prev => [...prev,comment])} />
                </aside>
            </div>
        </div>
    )
}
