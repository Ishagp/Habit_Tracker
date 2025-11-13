import Navigation from './components/navigation/navigation'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { useState } from "react";
import Habitlist from './components/Habitlist/Habitlist';

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

  return (
    <>
      <Navigation />
      <Dashboard habits={habits} />
      <Habitlist habits={habits} toggleHabit={toggleHabit} />
    </>
  )
}

export default App
