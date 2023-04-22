import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '../../environment';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import CoffeeForm from './CoffeeForm';



const CoffeePage = (params) => {
// formValues stores and Updates the current value of a form, and setFormValues function is used to update the form values when the user types in new info.
  const [formValues, setFormValues] = useState({});
  const dataFetchedRef = useRef(false);

  const { id } = useParams();

  //  fetches data for a specific coffee entry using a GET request and the id and params.method
  const fetchCoffee = async () => {
    try {
      // if it's a (PUT) the user is trying to edit so it send to specific endpoint for updating a coffee
      if (params.method === 'PUT') {
        const url = `${baseURL}/coffee/${id}`;
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': `${localStorage.getItem('token')}`,
          }),
          method: 'GET'
        });
    
        const data = await response.json();
        // console.log('data:', data);

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

  // useEffect called whenever the id or params.method values change, and it calls the fetchCoffee function to retrieve data for a specific coffee entry.
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchCoffee();
  }, [id, params.method]);

// initializes  method, url, initialValues, errorMessage to be used if params.method value is POST which means the user is creating a new coffee plus set the url to an endpoint that will create a new coffee , should also set the some default values 
  let method, url, initialValues, submitButtonText, errorMessage;

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
      in:'',
      out:'',
      time:'30',
      grind:'',
      temp:'200',
      wedge:'',
      wdt:false,
      rdt:false,
      notes:'',
      img:''
    };
    submitButtonText='Add Coffee Entry';
    errorMessage = 'Error adding coffee entry:';
  } else if (params.method === 'PUT') {
    method = 'PUT';
    url = `${baseURL}/coffee/${id}`;
    // Pass the retrieved coffee data as initial values
    initialValues = formValues;
    submitButtonText ='Add Coffee Entry';
    errorMessage = 'Error updating coffee entry:';
  }

  return (
    <Container maxWidth="xs">
      <TemporaryDrawer />
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Add Coffee
      </Typography>
      <CoffeeForm
        method={method}
        url={url}
        initialValues={initialValues}
        submitButtonText={submitButtonText}
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




