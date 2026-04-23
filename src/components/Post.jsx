import { Link } from 'react-router'
export function Post({id,username,title,content,created_at}){
    const hasFullContent = content !== null;

    return(
        <article className={`post ${hasFullContent ? "post-full" : "post-preview"}`}>
            <div className="post-kicker">Feature</div>
            <h2 className="post-title">{title}</h2>
            <div className="post-meta">
                <span>By {username}</span>
                <span>{new Date(created_at).toLocaleString()}</span>
            </div>
            {hasFullContent ? <p className="post-body">{content}</p> : null}
            {!hasFullContent ? <Link className="inline-link" to={`/posts/${id}`}>Continue reading</Link> : null}
        </article>
    )
}
