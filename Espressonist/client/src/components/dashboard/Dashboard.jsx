
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardActions} from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environment';
import CoffeeDetails from '../coffee/CoffeeDetails';
import TemporaryDrawer from '../layout/TemporaryDrawer';

const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]);
  const [userId] = useState(localStorage.getItem('user_id'));


  //currentUser is initialized to (null) using useState, It will store the information of the currently logged-in user, if any.
  const [currentUser, setCurrentUser] = useState(null);


  

  console.log('UserID:', userId)

  const fetchCoffeeEntries = useCallback(async () => {
    const url = `${baseURL}/coffee/getall/`;
    
    try {
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
      console.log('Fetched coffee entries:', data);
      
      if (data && Array.isArray(data.coffeeEntries)) {
        setCoffeeEntries(data.coffeeEntries);
      } else {
        console.error('Error fetching coffee entries: data.coffeeEntries is not an array');
      }
    } catch (error) {
      console.error('Error fetching coffee entries:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchCoffeeEntries();
  }, [fetchCoffeeEntries]);

  const fetchCurrentUser = useCallback(async () => {
    const url = `${baseURL}/user/me`; // Update this URL to match your API endpoint to get the current user's data
  
    try {
      const response = await fetch(url, {
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
        method: "GET"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch current user');
      }
  
      const data = await response.json();
      console.log('Fetched current user:', data);
      setCurrentUser(data.user);
  
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  }, []);
  
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  

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
      // This updates coffieEntries by filtering out the entry with a matching _id and userId,
      // but also checks if user exists in the entry before it does so.
      setCoffeeEntries(coffeeEntries.filter(entry => entry._id !== id || (entry.user && entry.user._id !== userId)));
      //  alert on the page that coffee was deleted
      alert('Coffee entry deleted successfully!');
  
      console.log('Coffee entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting coffee entry:', error);
    }
  };
  

  const canEditDelete = (creatorId) => {
    return (creatorId === userId) || (currentUser && currentUser.role === 'admin');
  };
  
  return (
    <Box bgcolor="#A67C52" style={{ minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <nav>
          <TemporaryDrawer />
        </nav>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Dashboard
        </Typography>
        <div>
          <br />
          <br />
          <br />
          <br />
          {coffeeEntries.length > 0 ? (
            <Grid container spacing={4}>
              {coffeeEntries.map((coffee) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={coffee._id}>
                  <Card
                    sx={{
                      marginBottom: 2,
                      transition: '0.3s',
                      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 0 20px rgba(0,0,0,0.9)',
                        transform: 'translateY(-6px)',
                      },
                    }}
                  >
                    <CardContent>
                      <CoffeeDetails coffeeData={coffee} />
                    </CardContent>
                    <CardActions>
                      {currentUser && (coffee.userId === currentUser._id || currentUser.isAdmin) && (
                        <>
                          <button onClick={() => handleDeleteCoffee(coffee._id)}>Delete</button>
                          <Link to={`/edit-coffee/${coffee._id}`}>
                            <button>Edit</button>
                          </Link>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No coffee entries yet. Add some!</p>
          )}
        </div>
      </Container>
    </Box>
  );
};

export default Dashboard;