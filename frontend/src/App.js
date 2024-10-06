import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import AddTask from './components/AddTask';
import Categories from './components/Categories';

import Login from './components/Login';
import Register from './components/Register';
import Calendar from './components/Calender';
import EditTask from './components/EditTask';
import TodaysTasks from './components/TodaysTasks';
import CompletedTasks from './components/CompletedTasks';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/add-category" element={<Categories />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/edit-task/:id" element={<EditTask />} /> 
          <Route path="/todays-tasks" element={<TodaysTasks />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />



          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
