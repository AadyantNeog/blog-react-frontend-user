export function Comment({user_id, content, created_at}){
    return(
        <article className="Comment">
            <div className="comment-meta">
                <span>Reader #{user_id}</span>
                <span>{new Date(created_at).toLocaleString()}</span>
            </div>
            <p className="comment-body">{content}</p>
        </article>
    )
}
