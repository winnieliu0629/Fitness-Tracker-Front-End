import { useState, useEffect } from "react";
import { fetchAllRoutines } from "../api/API";
import GuestRoutineList from "./GuestRoutineList";

const GuestRoutine = () => {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        Promise.all([fetchAllRoutines()])
        .then(([routines]) => {
            setRoutines(routines)
        })
    }, []);
    
    return (
        <div className="panel">
            <h1>Welcome Guest!</h1>
            <GuestRoutineList routines={routines} />
        </div>
    )
};

export default GuestRoutine;