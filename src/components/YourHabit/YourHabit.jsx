import { useState } from "react";
import styles from "./YourHabit.module.css";

const YourHabit = ({ habits }) => {
  const [search, setSearch] = useState("");

  // Filter habits based on search text
  const filteredHabits = habits.filter(habit =>
    habit.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>

      <h1 className={styles.heading}>Your Habits</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search habits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />

      <button
        className={styles.add_btn}
        onClick={() => setShowModal(true)}
      >
        + Add New Habit
      </button>

      {/* Habits List */}
      <div className={styles.habitList}>
        {search.trim() !== "" && filteredHabits.map((habit) => (
          <div key={habit.id} className={styles.habitCard}>
            {habit.title}
          </div>
        ))}
      </div>

    </div>


  );
};

export default YourHabit;
