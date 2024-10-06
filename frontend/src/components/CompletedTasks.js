import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import API from '../api';
import moment from 'moment';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  // Fetch completed tasks from the API
  const fetchCompletedTasks = async () => {
    try {
      const response = await API.get('/tasks/completed');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Completed Tasks
      </Typography>

      {loading ? (
        <Typography>Loading completed tasks...</Typography>
      ) : (
        <Grid container spacing={3}>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Link to={`/edit-task/${task.id}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <CardContent>
                      <Typography variant="h6">{task.title}</Typography>
                      <Typography variant="body2" color="textSecondary">Priority: {task.priority}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Completed Date: {task.completionDate ? moment(task.completionDate).format('MMM D, YYYY') : 'No completion date'}
                      </Typography>
                      <Typography variant="body2">Progress: {task.progress}%</Typography>
                      <LinearProgress variant="determinate" value={task.progress} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography>No completed tasks found.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default CompletedTasks;
