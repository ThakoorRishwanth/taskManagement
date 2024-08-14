import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../utils/api';
import { setTasks, addTask, updateTask as updateTaskAction, deleteTask as deleteTaskAction } from '../redux/slices/taskSlice';
import TaskForm from '../components/TaskForm';
import Task from '../components/Task';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const loadTasks = async () => {
                try {
                    const response = await fetchTasks();
                    dispatch(setTasks(response.data));
                } catch (error) {
                    console.error("Failed to fetch tasks:", error);
                }
            };
            loadTasks();
        }
    }, [dispatch, isAuthenticated]);

    if (loading) return <p>Loading...</p>;
    if (!isAuthenticated) return <p>Please log in to view tasks.</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <TaskForm />
            <Task />
        </div>
    );
};

export default Dashboard;
