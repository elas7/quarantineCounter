import React from "react";
import Joke from "./Joke";
import "./App.css";

const Calendar = ({ days }) => {
  return (
    <div>
      <div className="calendar">
        <div className="header">Days in Quarantine</div>
        <span>{days}</span>
      </div>
      <Joke />
    </div>
  );
};

export default Calendar;
