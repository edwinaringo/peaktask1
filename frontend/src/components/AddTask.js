import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import API from '../api'; 

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
    recurring: 'None',
    attachments: '',
    progress: 0,  
    categoryId: '', 
  });

  const [categories, setCategories] = useState([]); 

  // Fetch available categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/categories'); 
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await API.post('/tasks', taskData);
      console.log('Task created:', response.data);
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <TextField
          label="Task Title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Task Description */}
        <TextField
          label="Task Description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        {/* Task Priority */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        {/* Task Due Date */}
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={taskData.dueDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        {/* Task Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </Select>
        </FormControl>

        {/* Recurring Task */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="recurring-label">Recurring</InputLabel>
          <Select
            labelId="recurring-label"
            name="recurring"
            value={taskData.recurring}
            onChange={handleChange}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        {/* Attachments */}
        <TextField
          label="Attachments (URL)"
          name="attachments"
          value={taskData.attachments}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Task Progress */}
        <TextField
          label="Progress (%)"
          name="progress"
          type="number"
          value={taskData.progress}
          onChange={handleChange} 
          fullWidth
          margin="normal"
          required
          inputProps={{ min: 0, max: 100 }}
        />

        {/* Category Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            value={taskData.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Add Task
        </Button>
      </form>
    </Box>
  );
};

export default AddTask;
