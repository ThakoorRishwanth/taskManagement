import axios from 'axios';

const API_URL = 'https://taskmanagement-8k6u.onrender.com/api';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/login`, userData);
};

export const fetchTasks = async () => {
    return await axios.get(`${API_URL}/tasks/`);
};

export const createTask = async (taskData) => {
    return await axios.post(`${API_URL}/tasks/`, taskData);
};

export const updateTask = async (id, taskData) => {
    return await axios.put(`${API_URL}/tasks/${id}`, taskData);
};

export const deleteTask = async (id) => {
    return await axios.delete(`${API_URL}/tasks/${id}`);
};