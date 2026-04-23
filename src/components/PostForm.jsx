import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <div className="eyebrow">Editorial Desk</div>
                <h1 className="masthead-title">File a New Story</h1>
                <div className="masthead-meta">
                    <span>Draft a headline and publish it to the front page</span>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="PostForm auth-form">
                <div className="form-heading">Story Submission</div>
                <label htmlFor="title">Headline</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content">Article body</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending to print..." : "Publish story"}
                </button>
            </form>
        </div>
    );
}
