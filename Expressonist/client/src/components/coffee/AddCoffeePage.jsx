import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import AddCoffeeForm from '../coffee/AddCoffeeForm';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environmnent';

const AddCoffeePage = ({ coffeeEntries, setCoffeeEntries, onAddCoffee }) => {
  const addCoffee = async (coffeeData) => {
    // Replace this URL with your API's base URL
    const Url = `${baseURL}/coffee`;
    try {
      console.log('url:', Url);
      const response = await fetch('/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({coffeeData}),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add coffee entry');
      }

      // Update the coffeeEntries state with the new entry
      setCoffeeEntries([...coffeeEntries, data]);

      // Optionally, display a success message to the user
      console.log('Coffee entry added successfully!');
    } catch (error) {
      console.error('Error adding coffee entry:', error);
    }
  };
  
  return (
    <Container maxWidth="xs">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Add Coffee
      </Typography>

      <AddCoffeeForm onAddCoffee={onAddCoffee} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <Link to="/dashboard">
          <Button variant="contained" color="primary">
            Return to Dashboard
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default AddCoffeePage;
