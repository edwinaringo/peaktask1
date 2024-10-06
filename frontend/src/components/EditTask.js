import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { useParams } from 'react-router-dom'; 
import API from '../api'; 

const EditTask = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
    recurring: 'None',
    attachments: '',
    progress: 0,
  });

  useEffect(() => {
    fetchTask(); // Fetch the task details when the component mounts
  }, []);

  const fetchTask = async () => {
    try {
      const response = await API.get(`/tasks/${id}`); // Fetch task by ID
      setTaskData(response.data); // Populate the form with the task data
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the entire task data, but only the changed fields will reflect the change
      await API.put(`/tasks/${id}`, taskData); // Update the task by ID
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <TextField
          label="Task Title"
          name="title"
          value={taskData.title} // Pre-fill the field with existing data
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Task Description */}
        <TextField
          label="Task Description"
          name="description"
          value={taskData.description} // Pre-fill with existing data
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
            value={taskData.priority} // Pre-fill with existing data
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
          value={taskData.dueDate} // Pre-fill with existing data
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Task Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={taskData.status} // Pre-fill with existing data
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
            value={taskData.recurring} // Pre-fill with existing data
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
          value={taskData.attachments} // Pre-fill with existing data
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Task Progress */}
        <TextField
          label="Progress (%)"
          name="progress"
          type="number"
          value={taskData.progress} // Pre-fill with existing data
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, max: 100 }}
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Update Task
        </Button>
      </form>
    </Box>
  );
};

export default EditTask;
