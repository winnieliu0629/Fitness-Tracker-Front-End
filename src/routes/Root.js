import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [token])

    function logout() {
       localStorage.removeItem('token');
       setToken('');
       setIsLoggedIn(false);
    }

    return (
        <div>
            <header>
                <h2 className="webName">Fitness Tracker</h2>
                <nav className="headerLink">
                    <Link to="home" className="linkStyle">Home</Link>
                    <Link to="routines" className="linkStyle">Routines</Link>
                    <Link to="activities" className="linkStyle">Activities</Link>
                    {token ? <Link to="myRoutines" className="linkStyle">My Routines</Link> : null}
                    {token ? null : <Link to="register" className="linkStyle">Register</Link>}
                    {token ? null : <Link to="login" className="linkStyle">Login</Link>}
                    {token ? <button onClick={logout} className="logoutButton">Log Out</button> : null}
                </nav>
            </header>
            <main>
                <Outlet 
                context={[
                    token, setToken,
                    isLoggedIn,setIsLoggedIn
                    ]}
                />
            </main>
        </div>
    );
}