import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '../../environment';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import CoffeeForm from './CoffeeForm';

const CoffeePage = (params) => {
  const [formValues, setFormValues] = useState({});
  const { id } = useParams();
  
  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        if(params.method === 'PUT') {
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
        }
      } catch (error) {
        console.error('Error fetching coffee entry:', error);
      }
    };
    fetchCoffee();
  }, [id,params.method]);

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
    url = `${baseURL}/coffee/${id}`;
    console.log('Form Values:', formValues)
    for (const [key, value] of Object.entries(formValues)) {
      console.log(`${key}: ${value} [${typeof value}]`);}
    initialValues = formValues;
    errorMessage = 'Error updating coffee entry:';
  }

  return (
    <Container maxWidth="xs">
      <TemporaryDrawer />
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {params.title}
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
