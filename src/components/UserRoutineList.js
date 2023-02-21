import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const UserRoutineList = ({ routines }) => {
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const navigate = useNavigate();

    return (
        <section>
            {
                routines.map(({ id, creatorName, name, goal, isPublic, activities }) => (
                    <div key={id} className="routines">
                        <div onClick={() => navigate(`/routines/${id}`, {state: { id, creatorName, name, goal, isPublic, activities }})}>
                            <h2>{name}</h2>
                            {goal ? <h4>Goal: {goal}</h4> : null}
                            {creatorName ? <h4>Creator: {creatorName}</h4> : null}
                            {activities.length === 0 ? null : <h4 className="activityLink">Click here to see related activities</h4>}
                        </div>
                        <div>
                            {
                                creatorName === username ? 
                                <button 
                                    onClick={() => navigate('/addActivity', {state: { id, creatorName, name, goal, activities }})}
                                    className="functionalButton"> Add Activity
                                </button> : null
                            }
                        </div>       
                    </div>             
                ))
            }
        </section>
    )
}

export default UserRoutineList