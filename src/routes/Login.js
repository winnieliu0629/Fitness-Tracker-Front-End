import { useState } from "react";
import { userLogin } from '../api/API';
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    async function submitRegistration(e) {
        e.preventDefault();
        const user = {
            username,
            password
        }
        const response = await userLogin(user);
        console.log(response);
        if (!response) {
            setPasswordErrorMessage("Username or password incorrect. Please try again")
        } else {
            localStorage.setItem('token', response.token)
            setIsLoggedIn(true);
            navigate('/home');
        }
    }

    return (
    <div className="panel">
        <h1>Log In</h1>
        <form onSubmit={submitRegistration}>
            <input 
            type="text" 
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            />
            <input 
            type="text" 
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErrorMessage ? <p>{passwordErrorMessage}</p> : null}
            <button type="submit" className="submitButton">Log In</button>
        </form>
    </div>
    )
};

export default Login;