import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environmnent';


const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('name');

  const fetchCoffeeEntries = async () => {
    // Replace this URL with your API's base URL
    const Url = `${baseURL}/coffee`;

    try {
      const response = await fetch(Url, {
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
  };

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



