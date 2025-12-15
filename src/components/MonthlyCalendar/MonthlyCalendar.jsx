import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const MonthlyCalendar = ({ completedDates }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const formatDate = (d) => {
        return new Date(year, month, d).toISOString().split("T")[0];
    };

    return (
        <div style={{
            width: "350px",
            padding: "20px",
            borderRadius: "12px",
            background: "#ffffff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginLeft: "160px",
            height: ""
        }}>
            
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px"
            }}>
                <button style={{
                    height: "20px"
                }}
                    onClick={prevMonth}> <MdOutlineKeyboardDoubleArrowLeft /></button>
                <h3>{currentDate.toLocaleString('default', { month: 'long' })} {year}</h3>
                <button onClick={nextMonth}><MdOutlineKeyboardDoubleArrowRight /></button>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px"
            }}>
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
                <div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                gap: "8px"
            }}>

                {Array(firstDay).fill(null).map((_, i) => (
                    <div key={"empty-" + i}></div>
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(day);

                    const isCompleted = completedDates.includes(dateStr);

                    return (
                        <div
                            key={day}
                            style={{
                                padding: "8px",
                                borderRadius: "6px",
                                background: isCompleted ? "#61d89f" : "#eee",
                                color: isCompleted ? "white" : "black",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthlyCalendar;
