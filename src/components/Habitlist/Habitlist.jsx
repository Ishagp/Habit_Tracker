import { useState, useEffect } from "react";
import styles from './Habitlist.module.css';
import MonthlyCalendar from '../MonthlyCalendar/MonthlyCalendar';
import { MdDelete } from "react-icons/md";

const getTodayStr = () => new Date().toISOString().split("T")[0];

const getYesterdayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
};

const computeStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;
    const unique = Array.from(new Set(dates));
    const sorted = unique.sort();
    let streak = 1;
    let current = new Date(sorted[sorted.length - 1]);

    for (let i = sorted.length - 2; i >= 0; i--) {
        const d = new Date(sorted[i]);
        const diff = Math.round((current - d) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
            streak++;
            current = d;
        } else {
            break;
        }
    }
    return streak;
};

const Habitlist = ({ habits, toggleHabit, addHabit, deleteHabit }) => {
    const [showModal, setShowModal] = useState(false);
    const [newHabit, setNewHabit] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("🔥");

    const emojiList = ["🔥", "💧", "📚", "🏃‍♀️", "🌿", "💤", "🧘‍♀️", "👨‍🎓", "✏️", "🔬", "😊", "🎨", "🎯", "🥛", "🌸"];

    const [completedDates, setCompletedDates] = useState(() => {
        const stored = localStorage.getItem("calendarCompletedDates");
        return stored ? JSON.parse(stored) : [];
    });

    const [habitStats, setHabitStats] = useState(() => {
        const stored = localStorage.getItem("habitStats");
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        localStorage.setItem("calendarCompletedDates", JSON.stringify(completedDates));
    }, [completedDates]);

    useEffect(() => {
        localStorage.setItem("habitStats", JSON.stringify(habitStats));
    }, [habitStats]);

    const todayStr = getTodayStr();

    const handleToggleHabit = (habit) => {
        const newCompleted = !habit.completed;

        setHabitStats((prev) => {
            const prevStats = prev[habit.id] || { completedDates: [], lastCompletedDate: null, streak: 0 };
            let completedDatesForHabit = prevStats.completedDates ? [...prevStats.completedDates] : [];
            let lastCompletedDate = prevStats.lastCompletedDate;
            let streak = prevStats.streak || 0;

            if (newCompleted) {
                if (!completedDatesForHabit.includes(todayStr)) {
                    completedDatesForHabit.push(todayStr);
                }
                const yesterdayStr = getYesterdayStr();
                if (lastCompletedDate === todayStr) {
                } else if (lastCompletedDate === yesterdayStr) {
                    streak = streak ? streak + 1 : 1;
                } else {
                    streak = 1;
                }
                lastCompletedDate = todayStr;
            } else {
                completedDatesForHabit = completedDatesForHabit.filter((d) => d !== todayStr);
                streak = computeStreak(completedDatesForHabit);
                lastCompletedDate = completedDatesForHabit.length
                    ? completedDatesForHabit[completedDatesForHabit.length - 1]
                    : null;
            }

            return {
                ...prev,
                [habit.id]: {
                    completedDates: completedDatesForHabit,
                    lastCompletedDate,
                    streak,
                },
            };
        });

        if (newCompleted) {
            setCompletedDates((prev) => (prev.includes(todayStr) ? prev : [...prev, todayStr]));
        } else {
            const anyOtherCompleted = habits.some((h) => h.id !== habit.id && h.completed);
            if (!anyOtherCompleted) {
                setCompletedDates((prev) => prev.filter((d) => d !== todayStr));
            }
        }

        toggleHabit(habit.id);
    };

    const handleSubmit = () => {
        if (newHabit.trim() === "") return;
        addHabit({
            title: selectedEmoji + " " + newHabit,
            description: newDescription,
        });
        setNewHabit("");
        setNewDescription("");
        setSelectedEmoji("🔥");
        setShowModal(false);
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "40px",
                alignItems: "flex-start",
            }}
        >
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 className={styles.heading}>Today's Habits</h1>

                    <button className={styles.add_btn} onClick={() => setShowModal(true)}>
                        + Add New Habit
                    </button>
                </div>

                <div style={{ marginTop: "2rem" }}>
                    {habits.map((habit) => {
                        const stats = habitStats[habit.id] || {};
                        const streak = stats.streak || 0;

                        return (
                            <div
                                key={habit.id}
                                style={{
                                    padding: "1rem",
                                    background: habit.completed ? "#d4f8d4" : "#f2f2f2",
                                    marginBottom: "10px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <div className={styles.HabitName}>
                                    <span>{habit.title}</span>
                                    {habit.description && (
                                        <p style={{ fontSize: "14px", color: "gray", marginTop: "5px" }}>
                                            {habit.description}
                                        </p>
                                    )}
                                    {/* {streak > 0 && (
                                        <p style={{ fontSize: "14px", color: "#05a35a", marginTop: "4px" }}>
                                            🔥 Streak: {streak} days
                                        </p>
                                    )} */}
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input
                                        type="checkbox"
                                        checked={habit.completed}
                                        onChange={() => handleToggleHabit(habit)}
                                    />

                                    <button
                                        style={{
                                            color: "black",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => deleteHabit(habit.id)}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <MonthlyCalendar completedDates={completedDates} />

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 100,
                    }}
                >
                    <div
                        style={{
                            width: "350px",
                            background: "white",
                            padding: "20px",
                            borderRadius: "15px",
                            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        <h2>Add New Habit</h2>

                        <p>Select Emoji:</p>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginBottom: "15px",
                                flexWrap: "wrap",
                            }}
                        >
                            {emojiList.map((emoji, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedEmoji(emoji)}
                                    style={{
                                        fontSize: "24px",
                                        padding: "8px",
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        background: selectedEmoji === emoji ? "#d1e7ff" : "#f2f2f2",
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
                                border: "1px solid #ccc",
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Enter description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: "#ccc",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
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
                                    cursor: "pointer",
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
