import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearSession } from "../utils/auth";
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
            clearSession();
            localStorage.setItem("token", data.token);
            navigate("/posts", { replace: true });
        }
    }
    return(
        <div className="LoginForm auth-page page-shell">
            <header className="masthead compact">
                <div className="eyebrow">Member Login</div>
                <h1 className="masthead-title">The React Forum</h1>
                <div className="masthead-meta">
                    <span>Sign in to your account</span>
                    <span>Access posts, comments, and likes</span>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-heading">Account Access</div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Sign in</button>
            </form>
            <p className="auth-link-row">
                New here? <Link className="inline-link" to="/signup">Create an account</Link>
            </p>
        </div>
        
    )
}
