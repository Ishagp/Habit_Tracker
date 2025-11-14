import styles from './Habitlist.module.css';
import MonthlyCalendar from '../MonthlyCalendar/MonthlyCalendar';

const Habitlist = ({ habits, toggleHabit }) => {
    return (
        <div style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start"
        }}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 className={styles.heading}>Today's Habits</h1>
                    <button className={styles.add_btn}>+  Add New Habit</button>
                </div>

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
            </div>
            <MonthlyCalendar completedDates={["2025-11-13", "2025-11-11"]} />
        </div>
    );
};

export default Habitlist;
