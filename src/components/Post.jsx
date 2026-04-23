import { Link } from 'react-router'
export function Post({
    id,
    username,
    title,
    content,
    created_at,
    likes_count = 0,
    liked_by_user = false,
    onToggleLike,
    likePending = false,
    likeError = "",
    showLikeButton = true
}){
    const hasFullContent = content !== null;

    return(
        <article className={`post ${hasFullContent ? "post-full" : "post-preview"}`}>
            <div className="post-kicker">Post</div>
            <h2 className="post-title">{title}</h2>
            <div className="post-meta">
                <span>By {username}</span>
                <span>{new Date(created_at).toLocaleString()}</span>
            </div>
            {hasFullContent ? <p className="post-body">{content}</p> : null}
            <div className="engagement-row">
                {showLikeButton ? (
                    <button
                        type="button"
                        className={`like-button ${liked_by_user ? "liked" : ""}`}
                        onClick={() => onToggleLike?.(id)}
                        disabled={likePending}
                    >
                        {liked_by_user ? "Unlike" : "Like"} post
                    </button>
                ) : null}
                <span className="like-count">{likes_count} like{likes_count === 1 ? "" : "s"}</span>
            </div>
            {likeError ? <p className="form-error">{likeError}</p> : null}
            {!hasFullContent ? <Link className="inline-link" to={`/posts/${id}`}>Open discussion</Link> : null}
        </article>
    )
}
