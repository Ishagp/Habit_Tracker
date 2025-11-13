import styles from './Navigation.module.css';
import { BsList } from "react-icons/bs";
import { useState } from "react";


const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* Navbar  */}
            <nav className={styles.navbar}>
                <h2 className={styles.title}>HabitTracker</h2>
                <ul className={styles.links}>
                    <li className={styles.link}>Your Habits</li>
                    <li className={styles.link}>Report</li>
                    <li className={styles.lists}>
                        <BsList
                            className='cursor-pointer hover:text-blue-200'
                            onClick={() => setIsOpen(true)} />
                    </li>
                </ul>
            </nav>

            {/* {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )} */}

            {/* Side Drawer  */}
            <div className={`fixed top-[66px] right-0 h-full w-64 bg-white text-gray-800 shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className='text-lg font-semibold'>Menu</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <ul className="flex flex-col p-4 gap-4">
                    <li className="hover:text-blue-600 cursor-pointer">Profile</li>
                    <li className="hover:text-blue-600 cursor-pointer">Settings</li>
                    <li className="hover:text-blue-600 cursor-pointer">About</li>
                    <li className="hover:text-blue-600 cursor-pointer">Log Out</li>
                </ul>
            </div>
        </>
    );
};

export default Navigation