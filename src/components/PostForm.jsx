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
        <form onSubmit={handleSubmit} className="PostForm">
            <label htmlFor="title">Title:</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />

            <label htmlFor="content">Content:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <br />

            <button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Create Post"}
            </button>
        </form>
    );
}