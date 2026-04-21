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
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <label for="password">ENTER PASSWORD: </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <label for="email">ENTER EMAIL: </label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">SUBMIT</button>
            </form>
            <Link to="/signup">Dont have an account then sign up</Link>
        </div>
        
    )
}