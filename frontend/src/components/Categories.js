import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import API from '../api'; 

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories'); 
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send category name to the API
      const response = await API.post('/categories', { name: categoryName });
      console.log('Category created:', response.data);
      alert('Category created successfully!');
      setCategoryName(''); 
      fetchCategories(); 
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Categories
      </Typography>
      
      {/* Form to add a new category */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          name="categoryName"
          value={categoryName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Add Category
        </Button>
      </form>

      {/* Display the list of categories */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          All Categories
        </Typography>
        {categories.length > 0 ? (
          <List>
            {categories.map((category) => (
              <ListItem key={category.id}>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No categories available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AddCategory;
