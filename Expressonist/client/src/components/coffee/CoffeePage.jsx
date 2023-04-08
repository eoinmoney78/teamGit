import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '../../environment';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import CoffeeForm from './CoffeeForm';


const CoffeePage = (params) => {
  // Initialize the form values state with an empty object
  const [formValues, setFormValues] = useState({});
  const { id } = useParams();
    
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

  let method, url, initialValues, errorMessage;
  if(params.method === 'POST') {
    method = 'POST';
    url = `${baseURL}/coffee`;
    initialValues = {
      roaster:'',
      coffee:'',
      process:'',
      variety:'',
      elevation:'',
      roast:'',
      inWeight:'',
      outWeight:'',
      time:'30',
      grind:'',
      temp:'200',
      wedge:'',
      wdt:false,
      rdt:false,
      notes:'',
      img:''
    }
    errorMessage = 'Error adding coffee entry:';
  } else if (params.method === 'PUT') {

    
    method = 'PUT';
    url = `${baseURL}/coffee/${id}`;;
    initialValues = {formValues}
    errorMessage = 'Error updating coffee entry:';
  }

  return (
    <Container maxWidth="xs">
      <TemporaryDrawer />
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        New Coffee
      </Typography>
      <CoffeeForm
        method={method}
        url={url}
        initialValues={initialValues}
        errorMessage={errorMessage}
      />
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

export default CoffeePage;





