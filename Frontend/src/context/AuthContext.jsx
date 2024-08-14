import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../utils/api'; // Assuming this API is available

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        // Check user authentication status from local storage or API
        const token = localStorage.getItem('token'); // Example
        if (token) {
            setIsAuthenticated(true);
            // Fetch user info and tasks if needed
            fetchTasks().then((response) => {
                dispatch(setTasks(response.data));
                setLoading(false);
            }).catch(() => setLoading(false));
        } else {
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, [dispatch]);

    const loginUser = async (credentials) => {
        try {
            // Perform login operation and set token
            const response = await login(credentials);
            localStorage.setItem('token', response.token);
            dispatch(login(response.user));
            setIsAuthenticated(true);
            navigate('/dashboard'); // Navigate to dashboard after login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
