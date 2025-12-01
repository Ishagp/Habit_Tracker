import Navigation from './components/navigation/navigation'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { useState } from "react";
import Habitlist from './components/Habitlist/Habitlist';
import YourHabit from './components/YourHabit/YourHabit';
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [habits, setHabits] = useState([
    { id: 1, title: "🧘‍♀️ Morning Exercise", description: "Do it daily for 30 min", completed: false },
    { id: 2, title: "📚 Read Books", description: "Do it daily for 1 hr", completed: false },
    { id: 3, title: "🥛 Drink Water", description: "Drinking Water keeps body hydrated ", completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  const addHabit = (habitObj) => {
    const newHabit = {
      id: Date.now(),
      title: habitObj.title,
      description: habitObj.description || "",
      completed: false,
    };

    setHabits(prev => [...prev, newHabit]);
    localStorage.setItem("habits", JSON.stringify([...habits, newHabit]));
  };


  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Dashboard habits={habits} />
              <Habitlist
                habits={habits}
                toggleHabit={toggleHabit}
                addHabit={addHabit}
                deleteHabit={deleteHabit}
              />
            </>
          }
        />

        <Route
          path="/your-habits"
          element={<YourHabit habits={habits} addHabit={addHabit} />}
        />
      </Routes>
    </>
  )
}

export default App
