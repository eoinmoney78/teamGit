
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environmnent';
import CoffeeDetails from '../coffee/CoffeeDetails';

const Dashboard = () => {
const [coffeeEntries, setCoffeeEntries] = useState([]); 

  
  const [userId] = useState(localStorage.getItem('user_id'));


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

// sends a DELETE request to the API to delete a coffee entry with the given ID, and removes the deleted entry from the state of coffee entries if successful.
  
  const handleDeleteCoffee = async (id) => {
    const url = `${baseURL}/coffee/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete coffee entry');
      }
      // This updates coffieEntries by filtering out the entry  with a matching _id and userId ,but also checks if user exists in the entry before it it does so.
      setCoffeeEntries(coffeeEntries.filter(entry => entry._id !== id || (entry.user && entry.user._id !== userId)));
//  alert on the page that coffe was deleted
      alert('Coffee entry deleted successfully!');

      console.log('Coffee entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting coffee entry:', error);
    }
  };

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