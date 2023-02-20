import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import UserRoutineList from "./UserRoutineList";
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
            <UserRoutineList routines={routines} />
        </div>
    )
};


export default UserRoutine;