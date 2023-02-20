import { useState } from "react";
import { addNewRoutine } from "../api/API";
import { useNavigate } from "react-router-dom";

const NewRoutine = () => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [routineErrorMessage, setRoutineErrorMessage] = useState('');
    const navigate = useNavigate();

    async function submitRoutine(e) {
        e.preventDefault()

        const routine = {
            name,
            goal,
            isPublic
        }

        const response = await addNewRoutine(routine);
        console.log(response);

        if (!name || !goal) {
            setRoutineErrorMessage('This is required Field')
        } else {
            navigate('/routines');
        }
    }

    return (
        <form onSubmit={submitRoutine} className="panel">
            <h1>Add New Routine</h1>
            <input 
            type="text" 
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            />
            {routineErrorMessage ? <p>{routineErrorMessage}</p> : null}
            <input 
            type="text" 
            value={goal}
            placeholder="goal"
            onChange={(e) => setGoal(e.target.value)}
            />
            {routineErrorMessage ? <p>{routineErrorMessage}</p> : null}
            <label>
                <input 
                    type="checkbox"
                    value={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                />
                <span>Visible to all users?</span>
            </label>
            
            <button type="submit" className="createButton">Create</button>
        </form>
    )
}

export default NewRoutine;