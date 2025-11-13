const Habitlist = ({ habits, toggleHabit }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            {habits.map(habit => (
                <div
                    key={habit.id}
                    style={{
                        padding: "1rem",
                        background: habit.completed ? "#d4f8d4" : "#f2f2f2",
                        marginBottom: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span>{habit.title}</span>

                    <input
                        type="checkbox"
                        checked={habit.completed}
                        onChange={() => toggleHabit(habit.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Habitlist;
