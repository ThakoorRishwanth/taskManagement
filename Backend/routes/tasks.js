const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all tasks
router.get('/', protect, getTasks);

// Create a new task
router.post('/', protect, createTask);

// Update an existing task
router.put('/:id', protect, updateTask);

// Delete a task
router.delete('/:id', protect, deleteTask);

module.exports = router;

