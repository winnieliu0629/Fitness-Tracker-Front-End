import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { editRoutine, deleteRoutine } from "../api/API";

const SingleRoutine = () => {
    const { state } = useLocation();
    const { id } = state;
    const [thisPost, setThisPost] = useState({...state});
    const { creatorName, name, goal, activities } = thisPost;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token');
    const { username } = jwt_decode(token);
    const [routineName, setRoutineName] = useState(name);
    const [routineGoal, setRoutineGoal] = useState(goal);
    const navigate = useNavigate();
    console.log(username)
    console.log(token)

    async function edit(e) {
        e.preventDefault()

        const routine = {
            name: routineName,
            goal: routineGoal,
        }
        
        console.log(routineName)
        console.log(routineGoal)

        const response = await editRoutine(routine, id);

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
        setThisPost(response);
        return response;
    }

    async function callDeleteRoutine(e) {
        e.preventDefault()
        const response = await deleteRoutine(id, token);
        navigate('/routines');
        return response;
    }
    
    return (
        <>
            <div key={id} className="routines">
                <h2>{name}</h2>
                {creatorName ? <h4>Creator Name: {creatorName}</h4> : null}
                {goal ? <h4>Goal: {goal}</h4> : null}
                {/* {activities ? <h4>Activities: {activities}</h4> : null} */}
                {username === creatorName ? <button onClick={() => {setIsEdited(true)}} className="functionalButton">Edit Routine</button> : null}
                {username === creatorName ? <button onClick={callDeleteRoutine} className="functionalButton">Delete Routine</button> : null}
            </div>
            {
                isEdited ? 
                <form onSubmit={edit} className="panel">
                    <h1>Edit Routine</h1>
                    <input 
                        type="text" 
                        defaultValue={thisPost.routineName}
                        placeholder="name"
                        onChange={(e) => setRoutineName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        defaultValue={thisPost.routineGoal}
                        placeholder="goal"
                        onChange={(e) => setRoutineGoal(e.target.value)}
                    />
                    <button type="submit" className="createButton">Edit</button>
                </form> : null
            }
        </>
    )
}
export default SingleRoutine;