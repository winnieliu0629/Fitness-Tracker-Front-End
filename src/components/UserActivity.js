import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
// import UserPostList from "./UserPostList";
import { fetchAllActivities } from "../api/API";

const UserRoutine = () => {
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        Promise.all([fetchAllActivities()])
        .then(([activities]) => {
            setActivities(activities)
        })
    }, []);

    const navigate = useNavigate();
    const navigateAddNewActivity = () => {
        navigate('/addActivity');
    };

    return (
        <div className="panel">
            <h1>Welcome {username}!</h1>
            <button onClick={navigateAddNewActivity} className="functionalButton">Add New Activity</button>
            {
                activities.map(({ id, name, description }) => (
                    <div key={id} className="routines">
                        <h2>{name}</h2>
                        {description ? <h4>Description: {description}</h4> : null}
                    </div>
                ))
            }
        </div>
    )
};


export default UserRoutine;