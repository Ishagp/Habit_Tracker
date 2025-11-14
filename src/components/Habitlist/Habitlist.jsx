import { useState } from "react";
import styles from './Habitlist.module.css';
import MonthlyCalendar from '../MonthlyCalendar/MonthlyCalendar';
import { MdDelete } from "react-icons/md";

const Habitlist = ({ habits, toggleHabit, addHabit, deleteHabit }) => {

    const [showModal, setShowModal] = useState(false);
    const [newHabit, setNewHabit] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("🔥");

    const emojiList = ["🔥", "💧", "📚", "🏃‍♀️", "🌿", "💤", "🧘‍♀️", "👨‍🎓", "✏️", "🔬", "😊", "🎨", "🎯", "🥛", "🌸"];

    const handleSubmit = () => {
        if (newHabit.trim() === "") return;

        addHabit(selectedEmoji + " " + newHabit);

        setNewHabit("");
        setSelectedEmoji("🔥");
        setShowModal(false);
    };

    return (
        <div style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start"
        }}>

            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 className={styles.heading}>Today's Habits</h1>

                    <button
                        className={styles.add_btn}
                        onClick={() => setShowModal(true)}
                    >
                        + Add New Habit
                    </button>
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
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <span>{habit.title}</span>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => toggleHabit(habit.id)}
                                />

                                <button
                                    style={{
                                        color: "black",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => deleteHabit(habit.id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <MonthlyCalendar completedDates={["2025-11-13", "2025-11-11"]} />

            {/* Popup div */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 100
                }}>
                    <div style={{
                        width: "350px",
                        background: "white",
                        padding: "20px",
                        borderRadius: "15px",
                        boxShadow: "0 0 20px rgba(0,0,0,0.2)"
                    }}>
                        <h2>Add New Habit</h2>

                        <p>Select Emoji:</p>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "15px",
                            flexWrap: "wrap"
                        }}>
                            {emojiList.map((emoji, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedEmoji(emoji)}
                                    style={{
                                        fontSize: "24px",
                                        padding: "8px",
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        background: selectedEmoji === emoji ? "#d1e7ff" : "#f2f2f2"
                                    }}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Enter habit name"
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: "#ccc",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                style={{
                                    background: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Add Habit
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Habitlist;
