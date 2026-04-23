import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Post } from "./Post";
import { SessionNav } from "./SessionNav";
import { getStoredToken, readUserFromToken } from "../utils/auth";

export function ProfilePage() {
    const token = getStoredToken();
    const user = readUserFromToken();
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState(user?.username ?? "Member");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            return;
        }

        const controller = new AbortController();

        async function loadProfilePosts() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("http://localhost:3000/me/posts", {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Unable to load your profile.");
                }

                const data = await response.json();
                setPosts(data.posts);
                setUsername(data.username);
            } catch (fetchError) {
                if (fetchError.name !== "AbortError") {
                    setError(fetchError.message || "Unable to load your profile.");
                }
            } finally {
                setLoading(false);
            }
        }

        loadProfilePosts();
        return () => controller.abort();
    }, [token]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="ProfilePage page-shell">
            <header className="masthead compact">
                <div className="masthead-top">
                    <SessionNav />
                </div>
                <div className="eyebrow">My Profile</div>
                <h1 className="masthead-title">{username}'s Posts</h1>
                <div className="masthead-meta">
                    <span>Review everything you have published</span>
                </div>
            </header>

            <section className="section-bar">
                <div>
                    <div className="section-label">Your Posts</div>
                    <p className="section-copy">Open any post to keep the conversation going.</p>
                </div>
                <Link className="button-link" to="/post">Create a new post</Link>
            </section>

            {loading ? <div className="status-panel">Loading your posts...</div> : null}
            {!loading && error ? <div className="status-panel">{error}</div> : null}
            {!loading && !error ? (
                <section className="posts-grid">
                    {posts.length > 0 ? posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            username={post.username}
                            title={post.title}
                            content={null}
                            created_at={post.created_at}
                            likes_count={post.likes_count}
                            liked_by_user={post.liked_by_user}
                            showLikeButton={false}
                        />
                    )) : <p className="empty-state">You have not created any posts yet.</p>}
                </section>
            ) : null}
        </div>
    );
}
