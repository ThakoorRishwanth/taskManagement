import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import Notification from './components/Notification';

const App = () => {
    return (
     
            
                        <div className="App">
                            <Notification /> {/* Show notifications globally if needed */}
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/tasks" element={<Task />} />
                                <Route path="/tasks/form" element={<TaskForm />} />
                                {/* Add more routes as needed */}
                            </Routes>
                        </div>
    );
};

export default App;
