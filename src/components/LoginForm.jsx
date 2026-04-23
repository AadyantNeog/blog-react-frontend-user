import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function LoginForm(){
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3000/login" ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                password,
                email
            })
        })
        const data = await response.json();
        if(data.success){
            localStorage.setItem("token", data.token);
            navigate("/posts", { replace: true });
        }
    }
    return(
        <div className="LoginForm auth-page page-shell">
            <header className="masthead compact">
                <div className="eyebrow">Morning Briefing</div>
                <h1 className="masthead-title">Sign In to the News Desk</h1>
                <div className="masthead-meta">
                    <span>Access today's posts and discussions</span>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-heading">Edition Access</div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Enter newsroom</button>
            </form>
            <p className="auth-link-row">
                New here? <Link className="inline-link" to="/signup">Create an account</Link>
            </p>
        </div>
        
    )
}
