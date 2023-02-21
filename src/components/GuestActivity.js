import { useState, useEffect } from "react";
import { fetchAllActivities } from "../api/API";

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

export default GuestActivity;