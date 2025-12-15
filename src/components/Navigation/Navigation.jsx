import styles from './Navigation.module.css';
import { BsList } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        localStorage.clear();
        setIsOpen(false);
        navigate("/");
    };

    return (
        <>
            <nav className={styles.navbar}>
                <h2 className={styles.title}>HabitTracker</h2>
                <ul className={styles.links}>
                    <li>
                        <Link to="/your-habits" className={styles.link}>
                            Your Habits
                        </Link>
                    </li>
                    <li><Link to="/report" className={styles.link}>Report</Link></li>

                    <li className={styles.lists}>
                        <BsList
                            className="cursor-pointer hover:text-blue-200"
                            onClick={() => setIsOpen(true)}
                        />
                    </li>
                </ul>
            </nav>

            <div
                className={`fixed top-[66px] right-0 h-fit w-64 bg-white text-gray-800 shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="p-3 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <ul className="flex flex-col p-4 gap-4">
                    <li>
                        <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-blue-600 cursor-pointer">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/timer" onClick={() => setIsOpen(false)} className="hover:text-blue-600 cursor-pointer">
                            Timer
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" onClick={() => setIsOpen(false)} className="hover:text-blue-600 cursor-pointer">
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" onClick={() => setIsOpen(false)} className="hover:text-blue-600 cursor-pointer">
                            Settings
                        </Link>
                    </li>
                    <li
                        onClick={handleLogout}
                        className="hover:text-red-500 cursor-pointer"
                    >
                        Log Out
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navigation;
