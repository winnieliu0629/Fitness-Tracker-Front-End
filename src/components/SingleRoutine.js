import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { editRoutine, deleteRoutine } from "../api/API";

const SingleRoutine = () => {
    const { state } = useLocation();
    const { id } = state;
    const [thisRoutine, setThisRoutine] = useState({...state});
    const { creatorName, name, goal, isPublic, activities, description, duration, count } = thisRoutine;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token');
    const { username } = jwt_decode(token);
    const [editName, setEditName] = useState(name);
    const [editGoal, setEditGoal] = useState(goal);
    const [editIsPublic, setEditIsPublic] = useState(isPublic);
    const navigate = useNavigate();

    async function edit(e) {
        e.preventDefault()

        const routine = {
            name: editName,
            goal: editGoal,
            isPublic: editIsPublic
        }

        const response = await editRoutine(routine, id, token);
        
        const updateRoutine = JSON.parse(
            localStorage.getItem('routines')).map((routine) => {
            if (routine.id === id) {
                return response
            } else {
                return routine
            }
        })

        localStorage.setItem('routines', JSON.stringify(updateRoutine))
        setIsEdited(false);
        setThisRoutine(response);
        navigate(`/routines`);
        return response;
    }

    async function onclickEdit(e) {
        e.preventDefault();
        if(isEdited === true) {
            setIsEdited(false);
        } else {
            setIsEdited(true);
        }
    }
    async function callDeleteRoutine(e) {
        e.preventDefault();
        const response = await deleteRoutine(id, token);
        navigate('/routines');
        return response;
    }
    
    return (
        <>
            <div key={id} className="panel">
                <h2>{name}</h2>
                <div className="routine">
                    {creatorName ? <h4>Creator Name: {creatorName}</h4> : null}
                    {goal ? <h4>Goal: {goal}</h4> : null}
                    {
                        username === creatorName ? 
                        isPublic ? <h4>Visible to all users? Yes</h4> : <h4>Visible to all users? No</h4> : null
                    }
                    {username === creatorName ? <button onClick={onclickEdit} className="functionalButton">Edit Routine</button> : null}
                    {username === creatorName ? <button onClick={callDeleteRoutine} className="functionalButton">Delete Routine</button> : null}
                </div>
                <div className="routine">
                    {
                        creatorName === username ? 
                        <button 
                            onClick={() => navigate('/addActivity', {state: { id, name, description, duration, count }})}
                            className="functionalButton"> Add Activity
                        </button> : null
                    }
                </div>
                <div>
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
            </div>
            {
                isEdited ? 
                <form onSubmit={edit} className="panel">
                    <h1>Edit Routine</h1>
                    <input 
                        type="text" 
                        defaultValue={thisRoutine.name}
                        placeholder="name"
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        defaultValue={thisRoutine.goal}
                        placeholder="goal"
                        onChange={(e) => setEditGoal(e.target.value)}
                    />
                    <label>
                        <input 
                            type="checkbox"
                            defaultValue={thisRoutine.isPublic}
                            onChange={() => setEditIsPublic(!thisRoutine.isPublic)}
                            className="checkbox"
                        />
                        {thisRoutine.isPublic === true ? <span>Change to private</span> : <span>Change to public</span>}
                    </label>
                    <button type="submit" className="createButton">Edit</button>
                </form> : null
            }
        </>
    )
}

export default SingleRoutine;