const GuestActivityList = ({ activities }) => {
    return (
        <section>
            {
                activities.map(({ id, name, description }) => (
                    <div key={id} className="routines">
                        <h2>{name}</h2>
                        {description ? <h4>Description: {description}</h4> : null}
                    </div>
                ))
            }
        </section>
    )
}

export default GuestActivityList;