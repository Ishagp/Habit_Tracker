import { useState } from "react";
import styles from "./YourHabit.module.css";
import { toast } from "react-toastify";


const YourHabit = ({ habits, addHabit }) => {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🔥");

  const emojiList = ["🔥", "💧", "📚", "🏃‍♀️", "🌿", "💤", "🧘‍♀️", "👨‍🎓", "✏️", "🔬", "😊", "🎨", "🎯", "🥛", "🌸"];


  // Filter habits based on search text
  const filteredHabits = habits.filter(habit =>
    habit.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (newHabit.trim() === "") {
      toast.error("Please enter a habit name!");
      return;
    }
    addHabit(selectedEmoji + " " + newHabit);
    toast.success("Habit added successfully! 🎉");

    setNewHabit("");
    setSelectedEmoji("🔥");
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.heading}>Your Habits</h1>

          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchBar}
            />

            {/* Habits List */}
            <div className={styles.habitList}>
              {search.trim() !== "" && filteredHabits.map((habit) => (
                <div key={habit.id} className={styles.habitCard}>
                  {habit.title}
                </div>
              ))}
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

      {/* Full Habit List below container */}

      <div className={styles.allHabits}>
        {habits.map((habit) => (
          <div key={habit.id} className={styles.fullHabitCard}>
            {habit.title}
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Add New Habit</h2>

            <p>Select Emoji:</p>
            <div className={styles.emojiGrid}>
              {emojiList.map((emoji, i) => (
                <span
                  key={i}
                  className={`${styles.emojiItem} ${selectedEmoji === emoji ? styles.activeEmoji : ""}`}
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

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
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
