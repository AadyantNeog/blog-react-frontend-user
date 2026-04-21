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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);   
    
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);

                const [postRes, commentsRes] = await Promise.all([
                    fetch(`http://localhost:3000/posts/${postid}`, { signal: controller.signal }),
                    fetch(`http://localhost:3000/posts/${postid}/comments`, { signal: controller.signal })
                ]);

                if (!postRes.ok || !commentsRes.ok) {
                    throw new Error("Server error");
                }

                const postData = await postRes.json();
                const commentsData = await commentsRes.json();

                setPost(postData.post[0]);
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
        return <p>Loading</p>
    }
    if(error){
        return <p>Network Error</p>
    }
    const allComments = comments.map((c) => {
        return <Comment user_id={c.user_id} content={c.content} created_at={c.created_at} />
    })
    return(
        
        <div className="PostPage">
            <Link to="/posts">Go back</Link>
            <Post id={post.id} user_id={post.user_id} title={post.title} content={post.content} created_at={post.created_at} />
            {allComments}
            <SubmitComment postid={postid} updateComments={(comment) => setComments(prev => [...prev,comment])} />
        </div>
    )
}