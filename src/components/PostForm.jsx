import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionNav } from "./SessionNav";

export function PostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token"); 

            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            // optional: get created post id
            const data = await response.json();

            navigate(`/posts/${data.id}`, {replace: true});

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="post-form-page page-shell">
            <header className="masthead compact">
                <div className="masthead-top">
                    <SessionNav />
                </div>
                <div className="eyebrow">Create Post</div>
                <h1 className="masthead-title">Share Something New</h1>
                <div className="masthead-meta">
                    <span>Write a title and share your post with the community</span>
                </div>
            </header>

            <div className="page-actions">
                <Link className="inline-link" to="/posts">Back to all posts</Link>
            </div>

            <form onSubmit={handleSubmit} className="PostForm auth-form">
                <div className="form-heading">New Post</div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content">Post content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Posting..." : "Publish post"}
                </button>
            </form>
        </div>
    );
}
