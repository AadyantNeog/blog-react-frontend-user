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
    const [postLikePending, setPostLikePending] = useState(false);
    const [postLikeError, setPostLikeError] = useState("");
    const [commentLikePendingId, setCommentLikePendingId] = useState(null);
    const [commentLikeError, setCommentLikeError] = useState("");
    const [commentLikeErrorId, setCommentLikeErrorId] = useState(null);
    
    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                setNotFound(false);

                const [postRes, commentsRes] = await Promise.all([
                    fetch(`http://localhost:3000/posts/${postid}`, {
                        signal: controller.signal,
                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                    }),
                    fetch(`http://localhost:3000/posts/${postid}/comments`, {
                        signal: controller.signal,
                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                    })
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

    async function handleTogglePostLike() {
        const token = localStorage.getItem("token");

        if (!token) {
            setPostLikeError("Sign in to like posts.");
            return;
        }

        try {
            setPostLikePending(true);
            setPostLikeError("");

            const response = await fetch(`http://localhost:3000/posts/${postid}/like`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Unable to update post like.");
            }

            const result = await response.json();

            setPost((currentPost) => ({
                ...currentPost,
                likes_count: result.likes_count,
                liked_by_user: result.liked
            }));
        } catch (toggleError) {
            setPostLikeError(toggleError.message || "Unable to update post like.");
        } finally {
            setPostLikePending(false);
        }
    }

    async function handleToggleCommentLike(commentId) {
        const token = localStorage.getItem("token");

        if (!token) {
            setCommentLikeError("Sign in to like comments.");
            setCommentLikeErrorId(commentId);
            return;
        }

        try {
            setCommentLikePendingId(commentId);
            setCommentLikeError("");
            setCommentLikeErrorId(null);

            const response = await fetch(`http://localhost:3000/posts/${postid}/comments/${commentId}/like`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Unable to update comment like.");
            }

            const result = await response.json();

            setComments((currentComments) =>
                currentComments.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            likes_count: result.likes_count,
                            liked_by_user: result.liked
                        }
                        : comment
                )
            );
        } catch (toggleError) {
            setCommentLikeError(toggleError.message || "Unable to update comment like.");
            setCommentLikeErrorId(commentId);
        } finally {
            setCommentLikePendingId(null);
        }
    }
    
    if(loading){
        return <div className="status-panel">Loading post...</div>
    }
    if(error){
        return <div className="status-panel">Unable to load this post.</div>
    }
    if(notFound){
        return (
            <div className="PostPage page-shell">
                <header className="article-header">
                    <Link className="inline-link" to="/posts">Back to all posts</Link>
                    <p className="empty-state">Post not found.</p>
                </header>
            </div>
        )
    }
    const allComments = comments.map((c) => {
        return (
            <Comment
                key={c.id}
                id={c.id}
                username={c.username}
                content={c.content}
                created_at={c.created_at}
                likes_count={c.likes_count}
                liked_by_user={c.liked_by_user}
                onToggleLike={handleToggleCommentLike}
                likePending={commentLikePendingId === c.id}
                likeError={commentLikeErrorId === c.id ? commentLikeError : ""}
            />
        )
    })
    return(
        
        <div className="PostPage page-shell">
            <header className="article-header">
                <div className="eyebrow">Post Thread</div>
                <Link className="inline-link" to="/posts">Back to all posts</Link>
            </header>

            <div className="article-layout">
                <main className="article-main">
                    <Post
                        id={post.id}
                        username={post.username}
                        title={post.title}
                        content={post.content}
                        created_at={post.created_at}
                        likes_count={post.likes_count}
                        liked_by_user={post.liked_by_user}
                        onToggleLike={handleTogglePostLike}
                        likePending={postLikePending}
                        likeError={postLikeError}
                    />
                </main>

                <aside className="article-sidebar">
                    <div className="section-label">Comments & Replies</div>
                    <p className="section-copy">Join the discussion around this post.</p>
                    <div className="comments-stack">
                        {allComments.length > 0 ? allComments : <p className="empty-state">No comments yet.</p>}
                    </div>
                    <SubmitComment postid={postid} updateComments={(comment) => setComments(prev => [...prev,comment])} />
                </aside>
            </div>
        </div>
    )
}
