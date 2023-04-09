import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardActions} from '@mui/material';
import { Link } from 'react-router-dom';

// The Component Dashboard  sets the initial state of coffeeEntries as an empty array, and userId as the user_id value  from local storage.
const Dashboard = () => {
const [coffeeEntries, setCoffeeEntries] = useState([]); 

  
  const [userId] = useState(localStorage.getItem('user_id'));


  //currentUser is initialized to "null" using useState, It will store the information of the currently logged-in user, if any.
  const [currentUser, setCurrentUser] = useState(null);


  

  // console.log('UserID:', userId)


// fetchCoffeeEntriesfunction uses the "fetch" to retrieve all coffee entries from the backend server, and updates the (coffeeEntries)  variable with the retrieved data if the request is successful, otherwise an error message is printed to the console. The useCallback  is used to catch the function instance and reuse it across renders as it does not depend on props.


  // With FetchCoffeeEntries the useCallBack was added due to the coffees keep rendering on the console  so this way the it doesn't get recreated on every render.
  
  const fetchCoffeeEntries = useCallback(async () => {
  const url = `${baseURL}/getall/${userId}`;
  
    try {
      // GET request to the  endpoint for fetching all coffee entries associated with a particular user. The user ID isin the userId state above.
      const response = await fetch(url, {
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
        method: "GET"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch coffee entries');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch coffee entries');
      }
    } catch (error) {
      console.error('Error fetching coffee entries:', error.message);
    }
  });

  // this calls the fetchCoffeeEntries function when the component mounts and whenever fetchCoffeeEntries or userId changes.
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



