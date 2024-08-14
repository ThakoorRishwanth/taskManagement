// Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

const Login = () => {
    const { isAuthenticated, loading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
    };

    if (loading) return <p>Loading...</p>;
    if (isAuthenticated) return <p>You are already logged in.</p>;

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
