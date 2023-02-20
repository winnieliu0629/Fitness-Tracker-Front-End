import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
// import UserPostList from "./UserPostList";
import { fetchAllRoutines } from "../api/API";

const UserRoutine = () => {
    const token = localStorage.getItem('token')
    const [routines, setRoutines] = useState([]);
    const { username } = jwt_decode(token);

    useEffect(() => {
        Promise.all([fetchAllRoutines()])
        .then(([routines]) => {
            setRoutines(routines)
            console.log("UserRoutine", routines);
        })
    }, []);

    const navigate = useNavigate();
    const navigateAddNewRoutine = () => {
        navigate('/newRoutine');
    };

    return (
        <div className="panel">
            <h1>Welcome {username}!</h1>
            <button onClick={navigateAddNewRoutine} className="functionalButton">Add New Routine</button>
            {/* <UserPostList posts={posts} /> */}
        </div>
    )
};


export default UserRoutine;