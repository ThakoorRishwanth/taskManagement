import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask as addTaskAction, updateTask as updateTaskAction } from '../redux/slices/taskSlice';
import { createTask, updateTask } from '../utils/api';

const TaskForm = () => {
    const [task, setTask] = useState({
        _id: null,
        title: '',
        description: '',
        priority: 'Medium',
        deadline: '',
        status: 'To Do',
        assignee: '',
        dateCreated: new Date().toISOString(),
    });
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    useEffect(() => {
        if (task._id) {
            const taskToEdit = tasks.find((t) => t._id === task._id);
            if (taskToEdit) {
                setTask(taskToEdit);
            }
        }
    }, [task._id, tasks]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.title) {
            if (task._id) {
                try {
                    const response = await updateTask(task);
                    dispatch(updateTaskAction(response.data));
                } catch (error) {
                    console.error("Failed to update task:", error);
                }
            } else {
                try {
                    const response = await createTask(task);
                    dispatch(addTaskAction(response.data));
                } catch (error) {
                    console.error("Failed to create task:", error);
                }
            }
            setTask({
                _id: null,
                title: '',
                description: '',
                priority: 'Medium',
                deadline: '',
                status: 'To Do',
                assignee: '',
                dateCreated: new Date().toISOString(),
            });
        }
    };

    const handleEdit = (id) => {
        setTaskId(id);
    };

    return (
        <div>
            <h2>{task._id ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                    />
                </div>
                <div>
                    <label>Priority:</label>
                    <select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label>Deadline:</label>
                    <input
                        type="date"
                        value={task.deadline.split('T')[0]}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={task.status}
                        onChange={(e) => setTask({ ...task, status: e.target.value })}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div>
                    <label>Assignee:</label>
                    <input
                        type="text"
                        value={task.assignee}
                        onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                    />
                </div>
                <button type="submit">{task._id ? 'Update Task' : 'Add Task'}</button>
            </form>
        </div>
    );
};

export default TaskForm;
