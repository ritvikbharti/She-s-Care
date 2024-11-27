import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaMedium } from "react-icons/fa";
const Mycalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0); // Tracks the current week
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentMonth] = useState(() => {
    const today = new Date();
    const options = { month: 'long', year: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  });

  const today = new Date();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1) // Adjust to get Monday as the start
  );

  const weeks = Array.from({ length: 4 }, (_, weekIndex) =>
    Array.from({ length: 5 }, (_, dayIndex) => {
      const day = new Date(
        startOfWeek.getTime() + (weekIndex * 7 + dayIndex) * 24 * 60 * 60 * 1000
      );
      return day;
    })
  );

  const color = ['indigo-600', 'cyan-400', 'pink-600', 'blue-600', 'indigo-500']
  const height = ['44', '24', '44', '24', '44']
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const handleAddNote = (option) => {
    setNotes((prev) => ({
      ...prev,
      [selectedDate.toISOString().split('T')[0]]: option,
    }));
    setShowPopup(false);
  };

  return (
    <div className="p-6 bg-dark-600   mt-16 mb-16 rounded-3xl h-1/2">
      <h3 className="text-xl  font-semibold text-center">{currentMonth}</h3>

      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          className=" text-gray-200 text-lg "
          onClick={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
        >
          <FaChevronLeft/>
        </button>
        <button
          className="text-gray-200 text-lg "
          onClick={() => setCurrentWeek((prev) => Math.min(prev + 1, weeks.length - 1))}
        >
          <FaChevronRight/>
        </button>
      </div>
      <hr className="my-4 border-t-1 border-slate-600" />

      {/* Week View */}
      <div className="grid mx-6 grid-cols-5 gap-4">
        {weeks[currentWeek].map((date, index) => {
          const isToday =
            date.toDateString() === new Date().toDateString(); // Highlight today's date
          const dateKey = date.toISOString().split('T')[0];

          return (
            <div
              key={index}
              className={`relative  rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer ${
                isToday ? ' text-slate-300' : ' text-slate-500 '
              }`}
              onClick={() => handleDateClick(date)}
            >
              <span className={`text-sm  ${isToday?'text-slate-300 font-semibold':'text-slate-600'}`}>{daysOfWeek[index]}</span>
              <span className="text-lg font-bold">{date.getDate()}</span>
              <hr className={`mx-4 h-52 border-l-2 ${isToday? 'border-slate-300': 'border-slate-500'} ` }/>
              {notes[dateKey] && (
                  <span className={`absolute text-center font-medium text-white items-center flex px-4 bg-${color[index]} w-60 h-12 top-${height[index]} rounded-2xl`}>
                    {notes[dateKey]}
               
                    </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Note Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dark-600 rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add Note for {selectedDate.toDateString()}</h2>
            <div className="space-y-2 ">
              {['Light', 'Heavy', 'Spotting', 'No Flow'].map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600"
                  onClick={() => handleAddNote(option)}
                >
                  {option} 
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500  text-white rounded-xl hover:bg-red-600"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycalendar;
