import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, TextField, LinearProgress } from '@mui/material';
import Sidebar from './Sidebar'; 
import API from '../api'; 
import moment from 'moment'; 
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  const navigate = useNavigate();

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks'); 
      const incompleteTasks = response.data.filter(task => task.status !== 'Completed');
      setTasks(incompleteTasks); 
      setFilteredTasks(incompleteTasks); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks by category
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => 
        task.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const today = moment().format('YYYY-MM-DD');
  const todayTasks = tasks.filter((task) => moment(task.dueDate).format('YYYY-MM-DD') === today);

  // Navigate to Today's Tasks page
  const goToTodaysTasks = () => {
    navigate('/todays-tasks', { state: { tasks: todayTasks } });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Search bar */}
        <Box sx={{ display: 'flex', marginBottom: 3 }}>
          <TextField
            label="Search by Category"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

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
                    <Button variant="contained" sx={{ mt: 2 }} onClick={goToTodaysTasks}>
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
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>           
                  <Link to={`/edit-task/${task.id}`} style={{ textDecoration: 'none' }}>
                    <Card sx={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <CardContent>                       
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography variant="body2" color="textSecondary">Priority: {task.priority}</Typography>                       
                        <Typography variant="body2" color="textSecondary">
                          Due Date: {task.dueDate ? moment(task.dueDate).format('MMM D, YYYY') : 'No due date'}
                        </Typography> 
                        <Typography variant="body2">Progress: {task.progress || 0}%</Typography> 
                        <LinearProgress variant="determinate" value={task.progress || 0} sx={{ mt: 1 }} />
                      </CardContent>
                    </Card>
                  </Link>
               </Grid>
              ))
            ) : (
              <Typography>No tasks found under this category.</Typography>
            )}
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
