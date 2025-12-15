import styles from './Dashboard.module.css';
import { FiTarget } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";

const Dashboard = ({ habits }) => {
    const habitStats = JSON.parse(localStorage.getItem("habitStats")) || {};
    const today = new Date().toISOString().split("T")[0];

    const total = habits.length;

    const completedToday = Object.values(habitStats).filter(
        h => h.completedDates?.includes(today)
    ).length;

    const completionRate = total === 0 ? 0 : Math.round((completedToday / total) * 100);

    const longestStreak = Object.values(habitStats).reduce(
        (max, h) => Math.max(max, h.streak || 0),
        0
    );

    return (
        <div className={styles.container}>
            <div className={styles.boxes}>
                <div className={`${styles.box} ${styles.gradient}`}>
                    <h2 className={styles.heading}>Today's Progress</h2>
                    <p className={styles.bigNum}>{completedToday}/{total}</p>
                    <p className={styles.subtext}>{completionRate}% complete</p>
                    <FiTarget className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Current Streak</h2>
                    <p className={styles.bigNum}>{longestStreak}</p>
                    <p className={styles.subtext}>Keep it up!</p>
                    <AiOutlineFire className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Total Habits</h2>
                    <p className={styles.bigNum}>{total}</p>
                    <p className={styles.subtext}>Consistency matters</p>
                    <FiAward className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Completion Rate</h2>
                    <p className={styles.bigNum}>{completionRate}%</p>
                    <p className={styles.subtext}>Keep Improving!</p>
                    <FiTrendingUp className={styles.icon} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
