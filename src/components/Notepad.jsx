import React, { useState } from 'react';

const Notepad = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="notepad-container bg-slate-700 p-5 rounded-md shadow-lg  w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">To Do List</h2>
      <div className="flex mb-4 w-full">
        <input
          className=" rounded p-2 flex-grow text-white bg-slate-600 border border-slate-400 focus:border-slate-400 focus:outline-none"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="list-none p-0">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b p-2 text-white bg-white bg-opacity-10 border-white border-opacity-10"
          >
            {task}
            <button
              className="bg-red-500 text-white p-2 rounded ml-2"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notepad;
