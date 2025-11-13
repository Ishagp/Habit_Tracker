import styles from './Dashboard.module.css';
import { FiTarget } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";


const Dashboard = ({ habits }) => {

    const total = habits.length;
    const completed = habits.filter(h => h.completed).length;

    const progress = `${completed}/${total}`;
    const completionRate = Math.round((completed / total) * 100);

    const streak = completed;

    return (
        <div className={styles.container}>
            <div className={styles.boxes}>

                <div className={styles.box + " " + styles.gradient}>
                    <h2 className={styles.heading}>Today's Progress</h2>
                    <p className={styles.bigNum}>{progress}</p>
                    <p className={styles.subtext}>{completionRate}% complete</p>
                    <FiTarget className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Current Streak</h2>
                    <p className={styles.bigNum}>{streak}</p>
                    <p className={styles.subtext}>Keep it up!</p>
                    <AiOutlineFire className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Total Completion</h2>
                    <p className={styles.bigNum}>{completed}</p>
                    <p className={styles.subtext}>Great Job</p>
                    <FiAward className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Avg Completion Rate </h2>
                    <p className={styles.bigNum}>{completionRate}%</p>
                    <p className={styles.subtext}>Keep Improving!</p>
                    <FiTrendingUp className={styles.icon} />
                </div>

            </div>
        </div>
    )
}

export default Dashboard