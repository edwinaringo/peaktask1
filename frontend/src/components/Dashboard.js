import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, LinearProgress, Button, Divider } from '@mui/material';
import Sidebar from './Sidebar'; 
import API from '../api'; 
import moment from 'moment'; 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 

  //fetch from api
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks'); 
      setTasks(response.data); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = moment().format('YYYY-MM-DD');
  const todayTasks = tasks.filter((task) => moment(task.dueDate).format('YYYY-MM-DD') === today);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {loading ? (
          <Typography>Loading tasks...</Typography>
        ) : (
          <Grid container spacing={3}>
            {/* Today's Task Section */}
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: '#f5f5f5', p: 2 }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography variant="h5" gutterBottom>
                      Today Task
                    </Typography>
                    <Typography variant="body1">
                      Check your daily tasks and schedules
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Today's Schedule
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Task illustration"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Task Cards Section */}
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Card sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardContent>
                      <Typography variant="subtitle1">{moment(task.dueDate).format('MMM D, YYYY')}</Typography>
                      <Typography variant="h6">{task.title}</Typography>
                      <Typography variant="body2">{task.progress}% Complete</Typography>
                      <LinearProgress variant="determinate" value={task.progress} sx={{ mt: 1 }} />
                    </CardContent>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">
                        {moment(task.dueDate).diff(moment(), 'days')} days left
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No tasks available.</Typography>
            )}

            
            <Grid item xs={12}>
              <Card sx={{ height: '250px' }}>
                <CardContent>
                  <Typography variant="h6">Tasks Completed</Typography>
                  {/* Graph Placeholder */}
                  <Typography variant="body2">Graph placeholder here</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* Right Sidebar */}
      <Box sx={{ width: 300, p: 3, bgcolor: '#f7f7f7' }}>
        {/* Calendar Placeholder */}
        <Card>
          <CardContent>
            <Typography variant="h6">Calendar</Typography>
            
            <Typography variant="body2">Calendar placeholder here</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
