import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
// import UserPostList from "./UserPostList";
import { fetchAllActivities } from "../api/API";

const UserRoutine = () => {
    const token = localStorage.getItem('token')
    const [activities, setActivities] = useState([]);
    const { username } = jwt_decode(token);

    useEffect(() => {
        Promise.all([fetchAllActivities()])
        .then(([activities]) => {
            setActivities(activities)
            console.log("UserRoutine", activities);
        })
    }, []);

    const navigate = useNavigate();
    const navigateAddNewActivity = () => {
        navigate('/newActivity');
    };

    return (
        <div className="panel">
            <h1>Welcome {username}!</h1>
            <button onClick={navigateAddNewActivity} className="functionalButton">Add New Activity</button>
            {/* <UserPostList posts={posts} /> */}
        </div>
    )
};


export default UserRoutine;