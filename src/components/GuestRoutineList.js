const GuestRoutineList = ({ routines }) => {
    return (
        <section>
            {
                routines.map(({ id, creatorName, name, goal, activities }) => (
                    <div key={id} className="routines">
                        <h2>{name}</h2>
                        {goal ? <h4>Goal: {goal}</h4> : null}
                        {creatorName ? <h4>Creator: {creatorName}</h4> : null}
                        {
                            activities ? 
                            <h4>Activity: {
                                activities.map(({ id, name, description, duration, count }) => (
                                    <div key={id} className="routines">
                                        <h2>{name}</h2>
                                        {description ? <h4>Description: {description}</h4> : null}
                                        {duration ? <h4>Duration: {duration}</h4> : null}
                                        {count ? <h4>Count: {count}</h4> : null}
                                    </div>
                                ))
                        } </h4> : null}
                    </div>

                ))
            }
        </section>
    )
}

export default GuestRoutineList;