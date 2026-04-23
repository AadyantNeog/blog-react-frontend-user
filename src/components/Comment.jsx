export function Comment({
    id,
    username,
    content,
    created_at,
    likes_count = 0,
    liked_by_user = false,
    onToggleLike,
    likePending = false,
    likeError = ""
}){
    return(
        <article className="Comment">
            <div className="comment-meta">
                <span>{username}</span>
                <span>{new Date(created_at).toLocaleString()}</span>
            </div>
            <p className="comment-body">{content}</p>
            <div className="engagement-row">
                <button
                    type="button"
                    className={`like-button ${liked_by_user ? "liked" : ""}`}
                    onClick={() => onToggleLike?.(id)}
                    disabled={likePending}
                >
                    {liked_by_user ? "Unlike" : "Like"} comment
                </button>
                <span className="like-count">{likes_count} like{likes_count === 1 ? "" : "s"}</span>
            </div>
            {likeError ? <p className="form-error">{likeError}</p> : null}
        </article>
    )
}
