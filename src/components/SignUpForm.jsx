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
        <form onSubmit={handleSubmit} className="SignUpForm">
            <label for="password">ENTER PASSWORD: </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <label for="email">ENTER EMAIL: </label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <label for="username">ENTER USERNAME: </label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button type="submit">SUBMIT</button>
        </form>
    )
}