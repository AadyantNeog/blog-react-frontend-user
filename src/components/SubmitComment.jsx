import { useState } from "react"
export function SubmitComment({postid,updateComments}){
    const [comment,setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault(); // stop default form submission
        setSubmitting(true)
        setError("")

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/posts/${postid}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: comment,
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit comment");
            }

            const data = await response.json();
            const actualComment = data.comment[0];
            updateComments(actualComment);
            setComment("")
        } catch (err) {
            setError(err.message || "Unable to submit comment right now.");
        } finally {
            setSubmitting(false)
        }
    };
    return(
        <form onSubmit={handleSubmit} className="SubmitComment">
            <div>Write a comment</div>
            <textarea value={comment} name="commentContent" onChange={(e) => setComment(e.target.value)}></textarea>
            {error ? <p>{error}</p> : null}
            <button type="submit" disabled={submitting}>
                {submitting ? "submitting..." : "submit comment"}
            </button>
        </form>
    )
}
