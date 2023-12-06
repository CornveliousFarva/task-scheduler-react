import React, { useState } from "react";
import './App.css';

function App() {
  // Classes
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasks, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");


  // HandleTaskChange Function
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  // HandlePriorityChange Function
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  
  // HandleDeadlineChange Function
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  // AddTask Function
  const addTask = () => {
    if (tasks.trim() === "" || deadline === ""){
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate){
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      task,
      priority,
      deadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setPriority("top");
    setDeadline("");
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask){
      setCompletedTasks([...completedTasks, completedTask]);
    }
  }

  const upcomingTasks = tasks.filter((t) => !t.done);

  return (
    <div className="App">
      <header>
        <h1> Task Scheduler </h1>
      </header>

      <main>
        <div className="task-form">
          <input
              type="text"
              id="task"
              placeholder="Please Enter Task"
              value={task}
              onChange={handleTaskChange}
          />

          <select
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="high"> High Priority </option>
            <option value="middle"> Middle Proirity </option>
            <option value="low"> Low Priority </option>
          </select>

          <input
              type="date"
              id="deadline"
              value="deadline"
              onChange={handleDeadlineChange}
          />

          <button id="add-task" onClick={addTask}>
            Add Task
          </button>
        </div>

        <h2 className="heading"> Upcoming </h2>
        <div className="task-list" id="task-list">
          
        </div>
      </main>
    </div>
  )
}

export default App;
