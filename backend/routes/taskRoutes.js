const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getAllTasks);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;
