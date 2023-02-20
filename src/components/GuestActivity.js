import { useState, useEffect } from "react";
import { fetchAllActivities } from "../api/API";
// import GuestPostList from "./GuestPostList";

const GuestActivity = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        Promise.all([fetchAllActivities()])
        .then(([activities]) => {
            setActivities(activities)
        })
    }, []);
    
    return (
        <div className="panel">
            <h1>Welcome Guest!</h1>
            {/* <GuestRoutineList routines={routines} /> */}
        </div>
    )
};

export default GuestActivity;