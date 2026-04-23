export function Comment({username, content, created_at}){
    return(
        <article className="Comment">
            <div className="comment-meta">
                <span>{username}</span>
                <span>{new Date(created_at).toLocaleString()}</span>
            </div>
            <p className="comment-body">{content}</p>
        </article>
    )
}
