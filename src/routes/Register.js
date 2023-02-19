import { useState } from 'react';
import { registerUser } from '../api/API';
import { useOutletContext } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [token, setToken] = useOutletContext();
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();

    async function submitRegistration(e) {
        e.preventDefault();
        if (!username) {
            setUsernameErrorMessage("Username is required");
        }
        if (password.length < 8) {
            setPasswordErrorMessage("Password needs to be a minimum of 8 characters")
        }
        if (password !== confirmPassword) {
            setConfirmPasswordErrorMessage("Passwords must match")
        }
        const user = {
            user: {
                username, // same as username: username
                password
            }
        }
        const response = await registerUser(user);
        console.log(response);
        if (response.error) {
            setUsernameErrorMessage("User already exists, please login instead.")
        } else {
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setIsLoggedIn(true)
        }
    }

    return(
    <div className="panel">
        <h1>Register Page</h1>
        <form onSubmit={submitRegistration}>
            <input 
            type="text" 
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            />
            {usernameErrorMessage ? <p>{usernameErrorMessage}</p> : null}
            <input 
            type="text" 
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErrorMessage ? <p>{passwordErrorMessage}</p> : null}
            <input 
            type="text" 
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordErrorMessage ? <p>{confirmPasswordErrorMessage}</p> : null}
            <button type="submit" className="submitButton">Register</button>
        </form>
    </div>
    )

};

export default Register;