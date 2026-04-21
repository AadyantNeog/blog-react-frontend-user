export function Comment({user_id, content, created_at}){
    return(
        <div className="Comment">
            <p>{content}</p>
            <div>Created by: {user_id}</div>
            <div>Created_at: {created_at}</div>
        </div>
    )
}