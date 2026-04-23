import { useState } from "react"
import { useNavigate } from "react-router-dom";
export function SignUpForm(){
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const navigate = useNavigate();


    async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email,
                username
            })
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        navigate("/login", { replace: true });

    } catch (err) {
        console.error(err);
    }
}
    return(
        <div className="auth-page page-shell">
            <header className="masthead compact">
                <div className="eyebrow">Join The Community</div>
                <h1 className="masthead-title">The React Forum</h1>
                <div className="masthead-meta">
                    <span>Create a new account</span>
                    <span>Create your profile and start posting</span>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="SignUpForm auth-form">
                <div className="form-heading">Sign Up</div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button type="submit">Create account</button>
            </form>
        </div>
    )
}
