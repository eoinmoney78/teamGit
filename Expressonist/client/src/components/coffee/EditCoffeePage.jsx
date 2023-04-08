import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CoffeeForm from './CoffeeForm';
import { baseURL } from '../../environment';

const EditCoffeePage = () => {
  const { id } = useParams();
  console.log('Id:', id);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});

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

      console.log('Retrieved coffee data:', data.coffeeEntry);

      setFormValues(data.coffeeEntry);
    } catch (error) {
      console.error('Error fetching coffee entry:', error);
    }
  };

  useEffect(() => {
    fetchCoffee();
  }, [id]);

  const handleSubmit = async (updatedCoffeeData) => {
    try {
        console.log('Data:', updatedCoffeeData);
      const url = `${baseURL}/coffee/${id}`; // interpolate the id parameter into the URL
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
  
      console.log('Updated coffee data:', data);
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating coffee entry:', error);
    }
  };
  
  

  console.log('Form values:', formValues);

  return (
    <Container maxWidth="xs">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Edit Coffee
      </Typography>
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
