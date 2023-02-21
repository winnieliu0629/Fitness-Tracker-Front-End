import { useState } from "react";
import { addNewActivity } from "../api/API";
import { useNavigate } from "react-router-dom";

const AddActivity = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [routineErrorMessage, setRoutineErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function submitActivity(e) {
        e.preventDefault()

        const activity = {
            name,
            description
        }

        const response = await addNewActivity(activity, token);
        console.log(response);

        if (!name || !description) {
            setRoutineErrorMessage('This is required Field')
        } else {
            navigate('/activities');
        }
    }

    return (

        <form onSubmit={submitActivity} className="panel">
            <h1>Add New Activity</h1>
            <input 
            type="text" 
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            />
            {routineErrorMessage ? <p>{routineErrorMessage}</p> : null}
            <input 
            type="text" 
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            />
            {routineErrorMessage ? <p>{routineErrorMessage}</p> : null}           
            <button type="submit" className="createButton">Create</button>
        </form>
    )
}

export default AddActivity;