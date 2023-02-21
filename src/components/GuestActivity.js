import { useState, useEffect } from "react";
import { fetchAllActivities } from "../api/API";
import GuestActivityList from "./GuestActivityList";

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
            <GuestActivityList activities={activities} />
        </div>
    )
};

export default GuestActivity;