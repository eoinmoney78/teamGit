import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('name');


  // With FetchCoffeeEntries the useCallBack was added due to the coffees keep rendering on the console  so this way the it doesn't get recreated on every render.
  const fetchCoffeeEntries = useCallback(async () => {
  const url = `${baseURL}/getall/${userId}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': ` ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch coffee entries');
      }

      setCoffeeEntries(data);
    } catch (error) {
      console.error('Error fetching coffee entries:', error);
    }
  });

  useEffect(() => {
    fetchCoffeeEntries();
  }, []);



  return (
    <Container maxWidth="xs">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Dashboard
      </Typography>
      <div>
        <br/>
        <br/>
        <Link to="/add-coffee">
          <button>Add New Recipe</button>
        </Link>
      </div>
   
    </Container>
  );
};

export default Dashboard;



