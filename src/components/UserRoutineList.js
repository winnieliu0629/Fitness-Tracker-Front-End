import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const UserRoutineList = ({ routines }) => {
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const navigate = useNavigate();

    return (
        <section>
            {
                routines.map(({ id, creatorName, name, goal, activities }) => (
                    <div key={id} className="routines">
                        <div onClick={() => navigate(`/routines/${id}`, {state: { id, creatorName, name, goal, activities }})}>
                            <h2>{name}</h2>
                            {goal ? <h4>Goal: {goal}</h4> : null}
                            {creatorName ? <h4>Creator: {creatorName}</h4> : null}
                            {
                                activities ? 
                                <h4>Activities: {
                                    activities.map(({ id, name, description, duration, count }) => (
                                        <div key={id} className="activities">
                                            <h2>{name}</h2>
                                            {description ? <h4>Description: {description}</h4> : null}
                                            {duration ? <h4>Duration: {duration}</h4> : null}
                                            {count ? <h4>Count: {count}</h4> : null}
                                        </div>
                                    ))
                            } </h4> : null}
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