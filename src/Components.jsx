
export function Post({user_id,title,content,created_at}){
    return(
        <div className="post">
            <h3>{title}</h3>
            <p>{content}</p>
            <div>Created by: {user_id}</div>
            <div>Created at: {created_at}</div>
        </div>
    )
}