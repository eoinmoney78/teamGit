import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CoffeeForm from './CoffeeForm';
import { baseURL } from '../../environment';

const EditCoffeePage = () => {
  // Get the coffee ID from the URL parameters using the useParams hook
  const { id } = useParams();

  const navigate = useNavigate();

  // Initialize the form values state with an empty object
  const [formValues, setFormValues] = useState({});

  // Get the coffee data from the server using a GET request when the component mounts
  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const url = `${baseURL}/coffee/${id}`;
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': `${localStorage.getItem('token')}`,
          }),
          method: 'GET'
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch coffee entry');
        }

        // Set the form values state with the retrieved coffee data
        setFormValues(data.coffeeEntry);
      } catch (error) {
        console.error('Error fetching coffee entry:', error);
      }
    };
    fetchCoffee();
  }, [id]);

  // Update the coffee data on the server using a PUT request when the form is submitted
  const handleSubmit = async (updatedCoffeeData) => {
    try {
      const url = `${baseURL}/coffee/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedCoffeeData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update coffee entry');
      }

      // Navigate to the dashboard page on successful update
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating coffee entry:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Edit Coffee
      </Typography>
      {/* Pass the initial form values and handleSubmit function as props to the CoffeeForm component */}
      <CoffeeForm
        method='PUT'
        initialValues={formValues}
        onSubmit={handleSubmit}
        errorMessage='Error updating coffee entry:'
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default EditCoffeePage;
