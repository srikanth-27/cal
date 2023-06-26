import React from "react";
import './Calendar.css'
export const Calendar = ({ date }) => {
    const [day, month, year] = date.split("/");

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
        calendarDays.push(<div className="calendar-day empty" key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const isHighlighted = i === parseInt(day, 10);

        calendarDays.push(
            <div className={`calendar-day${isHighlighted ? " highlighted" : ""}`} key={i}>
                {i}
            </div>
        );
    }
    const monthName = new Date(year, month - 1, 1).toLocaleString("default", { month: "long" });

    const calendarHeader = (
        <div className="calendar-header">
            <h2>{`${monthName} ${year}`}</h2>
        </div>
    );

    const calendarDaysOfWeek = (
        <div className="calendar-days">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div className="calendar-day" key={day}>
                    {day}
                </div>
            ))}
        </div>
    );

    return (
        <div className="calendar">
            {calendarHeader}
            <div className="calendar-body">
                {calendarDaysOfWeek}
                <div className="calendar-dates">{calendarDays}</div>
            </div>
        </div>
    );
};

