import { useState, useEffect } from "react";
import { userRoutines } from "../api/API";
import jwt_decode from 'jwt-decode';

const MyRoutines = () => {
    const [userRoutine, setUserRoutine] = useState([]);
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);

    useEffect(() => {
        Promise.all([userRoutines(username, token)])
        .then(([userRoutine]) => {
            setUserRoutine(userRoutine)
        })
    }, []);

    return(
        <div className="panel">
            <h1>Welcome {username}!</h1>
            {
                userRoutine.map(({ id, name, goal, isPublic, activities }) => (
                    <div key={id} className="routines">
                        <h2>{name}</h2>
                        {goal ? <h4>Goal: {goal}</h4> : null}
                        {isPublic ? <h4>Visible to all users? Yes</h4> : <h4>Visible to all users? No</h4>}
                        {
                            activities.length === 0 ? null :
                            <h4>Activities: {
                                activities.map(({ id, name, description, duration, count }) => (
                                    <div key={id} className="activities">
                                        <h2>{name}</h2>
                                        {description ? <h4>Description: {description}</h4> : null}
                                        {duration ? <h4>Duration: {duration}</h4> : null}
                                        {count ? <h4>Count: {count}</h4> : null}
                                    </div>
                                ))} 
                            </h4>
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default MyRoutines;