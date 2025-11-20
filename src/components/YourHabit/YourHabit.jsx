import { useState } from "react";
import styles from "./YourHabit.module.css";

const YourHabit = ({ habits }) => {
  const [search, setSearch] = useState("");

  // Filter habits based on search text
  const filteredHabits = habits.filter(habit =>
    habit.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topRow}>
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
        </div>

        {/* Habits List */}
        <div className={styles.habitList}>
          {search.trim() !== "" && filteredHabits.map((habit) => (
            <div key={habit.id} className={styles.habitCard}>
              {habit.title}
            </div>
          ))}
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

    </>
  );
};

export default YourHabit;
