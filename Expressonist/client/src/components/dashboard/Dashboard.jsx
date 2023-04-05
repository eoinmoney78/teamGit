import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]); 

  // With FetchCoffeeEntries the useCallBack was added due to the coffees keep rendering on the console  so this way the it doesn't get recreated on every render.


  
  // const fetchCoffeeEntries = useCallback(async () => {
  //   const url = `${baseURL}/coffee/getall/${userId}`;
    
  //   try {
  //           // GET request to the  endpoint for fetching all coffee entries associated with a particular user. The user ID isin the userId state above.
  //     const response = await fetch(url, {
  //       headers: new Headers({
  //         'Authorization': `${localStorage.getItem('token')}`,
  //       }),
  //       method: "GET"
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to fetch coffee entries');
  //     }
  
  //     const responseData = await response.text();
  //     if (!responseData) {
  //       console.error('Error fetching coffee entries: Empty response data');
  //       return; // Exit the function early since we can't proceed with empty data
  //     }
  
  //     let data;
  //     try {
  //       data = JSON.parse(responseData);
  //     } catch (error) {
  //       console.error('Error parsing JSON data:', error);
  //       return; // Exit the function early since we can't proceed with invalid data
  //     }
  
  //     console.log('Fetched coffee entries:', data);
  
  //     if (data && Array.isArray(data.coffeeEntries)) {
  //       const filteredData = data.coffeeEntries.filter(entry => String(entry.userId)
  //         === String(localStorage.getItem('user_id')));
  
  //       console.log('Filtered coffee entries:', filteredData);
  //       setCoffeeEntries(filteredData);
  //     } else {
  //       console.error('Error fetching coffee entries: data.coffeeEntries is not an array');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching coffee entries:', error.message);
  //   }
  // }, [userId]);
  

  const fetchCoffeeEntries = useCallback(async () => {
  const [userId] = useState(localStorage.getItem('user_id'));
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



