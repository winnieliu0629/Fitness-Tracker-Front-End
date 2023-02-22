import { useNavigate } from "react-router-dom";

const UserRoutineList = ({ routines }) => {
    const navigate = useNavigate();

    return (
        <section>
            {
                routines.map(({ id, creatorName, name, goal, isPublic, activities, description, duration, count }) => (
                    <div key={id} className="routines">
                        <div onClick={() => navigate(`/routines/${id}`, {state: { id, creatorName, name, goal, isPublic, activities, description, duration, count }})}>
                            <h2>{name}</h2>
                            {goal ? <h4>Goal: {goal}</h4> : null}
                            {creatorName ? <h4>Creator: {creatorName}</h4> : null}
                            {activities.length === 0 ? null : <h4 className="activityLink">Click here to see related activities</h4>}
                        </div>    
                    </div>             
                ))
            }
        </section>
    )
}

export default UserRoutineList