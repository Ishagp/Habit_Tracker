import Navigation from './components/navigation/navigation'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { useState } from "react";
import Habitlist from './components/Habitlist/Habitlist';
import YourHabit from './components/YourHabit/YourHabit';
import { Routes, Route } from "react-router-dom";

function App() {

  const [habits, setHabits] = useState([
    { id: 1, title: "Morning Exercise", completed: false },
    { id: 2, title: "Read Books", completed: false },
    { id: 3, title: "Drink Water", completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  const addHabit = (title) => {
    const newHabit = {
      id: Date.now(),
      title,
      completed: false
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  return (
    <>
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
          element={<YourHabit habits={habits} />}
        />
      </Routes>
    </>
  )
}

export default App
