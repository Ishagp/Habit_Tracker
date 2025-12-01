import { useState } from "react";
import styles from "./YourHabit.module.css";
import { toast } from "react-toastify";

const YourHabit = ({ habits, addHabit }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🔥");

  const [habitStats] = useState(() => {
    const stored = localStorage.getItem("habitStats");
    return stored ? JSON.parse(stored) : {};
  });

  const emojiList = ["🔥", "💧", "📚", "🏃‍♀️", "🌿", "💤", "🧘‍♀️", "👨‍🎓", "✏️", "🔬", "😊", "🎨", "🎯", "🥛", "🌸"];

  const filteredHabits = habits.filter((habit) =>
    habit.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (newHabit.trim() === "") {
      toast.error("Please enter a habit name!");
      return;
    }
    addHabit({
      title: selectedEmoji + " " + newHabit,
      description: newDescription
    });
    toast.success("Habit added successfully! 🎉");

    setNewHabit("");
    setNewDescription("");
    setSelectedEmoji("🔥");
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.heading}>Your Habits</h1>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchBar}
            />

            <div className={styles.habitList}>
              {search.trim() !== "" &&
                filteredHabits.map((habit) => {
                  const stats = habitStats[habit.id] || {};
                  const streak = stats.streak || 0;

                  return (
                    <div key={habit.id} className={styles.habitCard}>
                      <span>{habit.title}</span>
                      {habit.description && (
                        <p
                          style={{
                            fontSize: "14px",
                            color: "gray",
                            marginTop: "4px",
                          }}
                        >
                          {habit.description}
                        </p>
                      )}
                      {streak > 0 && (
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#05a35a",
                            marginTop: "4px",
                          }}
                        >
                          🔥 Streak: {streak} days
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            className={styles.add_btn}
            onClick={() => setShowModal(true)}
          >
            + Add New Habit
          </button>
        </div>
      </div>

      <div className={styles.allHabits}>
        {habits.map((habit) => {
          const stats = habitStats[habit.id] || {};
          const streak = stats.streak || 0;

          return (
            <div key={habit.id} className={styles.fullHabitCard}>
              {streak > 0 && (
                <div className={styles.streakBadge}>
                  🔥 {streak}
                </div>
              )}

              <span>{habit.title}</span>

              {habit.description && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "gray",
                    marginTop: "4px",
                  }}
                >
                  {habit.description}
                </p>
              )}

            </div>
          );
        })}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Add New Habit</h2>

            <p>Select Emoji:</p>
            <div className={styles.emojiGrid}>
              {emojiList.map((emoji, i) => (
                <span
                  key={i}
                  className={`${styles.emojiItem} ${selectedEmoji === emoji ? styles.activeEmoji : ""
                    }`}
                  onClick={() => setSelectedEmoji(emoji)}
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
              className={styles.inputBox}
            />

            <input
              type="text"
              placeholder="Enter description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className={styles.inputBox}
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourHabit;
