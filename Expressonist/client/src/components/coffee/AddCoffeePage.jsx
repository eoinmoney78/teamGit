import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import AddCoffeeForm from '../coffee/AddCoffeeForm';
import { baseURL } from '../../environment';
import TemporaryDrawer from '../layout/TemporaryDrawer';


const AddCoffeePage = () => {

    // useNavigate hook from react-router-dom to navigate 
  const navigate = useNavigate();

// handleAddCoffee function to make a POST request to the Server and add a new coffee entry
  const handleAddCoffee = async (coffeeData) => {

    // Replace this URL with your API's base URL
    const Url = `${baseURL}/coffee`;

    console.log('Adding coffee entry with data:', coffeeData);

// POST request to a specified URL with the  coffeeData in the request body, and attaches the authorization token from local storage as a header
    try {
      const response = await fetch(Url, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(coffeeData),
      });

      // checks if the response is okay, and if not, throws an error. If the response is okay, it parses the response data and logs it to the console, then returns it. If there is an error, it logs the error to the console.

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add coffee entry');
      }
      const savedEntry = await response.json();

      console.log('Coffee entry added:', savedEntry);

      return savedEntry;

    } catch (error) {
      console.error('Error adding coffee entry:', error);
    }
  };

// handleSubmit function to handle the form submission and add a new coffee entry
  const handleSubmit = async (coffeeData) => {
    try {
      console.log('Submitting coffee data:', coffeeData);
      const newEntry = await handleAddCoffee(coffeeData);
      console.log('Coffee entry added successfully!', newEntry);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding coffee entry:', error);
    }
  };


   // Return the AddCoffeeForm and a button to return to the dashboard page
  return (
    <Container maxWidth="xs">
      <TemporaryDrawer />
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        New Coffee
      </Typography>
      <AddCoffeeForm onSubmit={handleSubmit} />
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





