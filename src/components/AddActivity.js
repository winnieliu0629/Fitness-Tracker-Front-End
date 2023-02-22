import { useState, useEffect } from "react";
import { addNewActivitytoRoutine } from "../api/API";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAllActivities } from "../api/API";

const AddActivity = () => {
    const { state } = useLocation();
    const { id } = state;
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState();
    const [duration, setDuration] = useState();
    const [count, setCount] = useState();
    const [routineErrorMessage, setRoutineErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllActivities()])
        .then(([activities]) => {
            setActivities(activities)
        })
    }, []);

    async function submitActivity(e) {
        e.preventDefault()

        const activity = {
            activityId,
            count,
            duration
        }
        console.log(activity)

        const response = await addNewActivitytoRoutine(activity, id);
        console.log(response);

        if (!duration || !count) {
            setRoutineErrorMessage('This is required Field')
        } else {
            navigate('/routines');
        }
    }

    return (

        <form onSubmit={submitActivity} className="panel">
            <h1>Add New Activity</h1>
            <div>
                <select onChange={(e) => setActivityId(e.target.value)} className="dropDownButton">
                    <option>-- Select one activity --</option>
                    {
                        activities.map(({ id, name }) => {
                            return <option value={id}>{name}</option>  
                        })
                    }
                </select>
            </div>
            <input 
            type="text" 
            value={count}
            placeholder="count"
            onChange={(e) => setCount(e.target.value)}
            />
            {routineErrorMessage ? <p>{routineErrorMessage}</p> : null}    
            <input 
            type="text" 
            value={duration}
            placeholder="duration"
            onChange={(e) => setDuration(e.target.value)}
            />
            {routineErrorMessage ? <p>{routineErrorMessage}</p> : null}       
            <button type="submit" className="createButton">Create</button>
        </form>
    )
}

export default AddActivity;