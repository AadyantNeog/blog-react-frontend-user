import { useState } from "react"
export function SubmitComment({postid,updateComments}){
    const [comment,setComment] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault(); // stop default form submission
        // manually send data
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/posts/${postid}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            content: comment,
            post_id: postid,
        })
        });
        if (!response.ok) {
            throw new Error("Failed to submit comment");
        }
        const data = await response.json();
        const actualComment = data.comment[0];
        updateComments(actualComment);
        setComment("")
    };
    return(
        <form onSubmit={handleSubmit}>
            <div>Write a comment</div>
            <textarea value={comment} name="commentContent" onChange={(e) => setComment(e.target.value)}></textarea>
            <button type="submit">submit comment</button>
        </form>
    )
}