import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask as deleteTaskAction } from '../redux/slices/taskSlice';

const Task = () => {
    const tasks = useSelector((state) => state.tasks || []);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        // Call API to delete task
        deleteTask(id).then(() => {
            dispatch(deleteTaskAction(id));
        }).catch((error) => console.error("Failed to delete task:", error));
    };

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Status: {task.status}</p>
                            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                            <p>Created: {new Date(task.dateCreated).toLocaleDateString()}</p>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                            {/* Add edit functionality */}
                        </li>
                    ))
                ) : (
                    <li>No tasks available</li>
                )}
            </ul>
        </div>
    );
};

export default Task;
