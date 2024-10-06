const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask, getTaskById, getCompletedTasks } = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getAllTasks);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

router.get('/completed', authenticateToken, getCompletedTasks);

module.exports = router;
