import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardActions, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environment';
import CoffeeDetails from '../coffee/CoffeeDetails';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import { Image } from 'cloudinary-react';


// Autocomplete component is used to create an input field with a dropdown menu that displays suggested options based on the user's input.

import Autocomplete from '@mui/material/Autocomplete';

//TextField component provided by Material-UI , can be used to create various types of input fields, including text fields, password fields
import TextField from '@mui/material/TextField';



const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);


  const [userId] = useState(localStorage.getItem('user_id'));
// When the user types in the search field, the setSearch function is called to update the search state variable with the new value.

  const [search, setSearch] = useState('');




// ---------------------------- SEARCH BAR ------------------------------

// handleSearchChange that takes two parameters: an event object representing the change event, and a value string representing the new value of the search input field.

  const handleSearchChange = (event, value) => {
    setSearch(value);
    // when the function is called it updates the search variable with the new value string using the setSearch function  causing the Dashboard component to re-render with the updated search value, 

    //make new array called filtered ,by filtering the coffeeEntries array based on whether the coffee property of each entry includes the current search value, which is converted to lowercase to make the comparison case-insensitive.

    const filtered = coffeeEntries.filter(entry => entry.coffee.toLowerCase().includes(value.toLowerCase()));

//sorts a filtered array of objects based on whether the "coffee" property starts with a specified value in a case-insensitive manner and then updates with sorted array
    const sorted = filtered.sort((a, b) => {

      // If the "coffee" property of a starts with the specified value, then it returns -1, which means that a should be placed before b in the sorted array.
      if (a.coffee.toLowerCase().startsWith(value.toLowerCase())) {
        return -1; // move a to the top
      }
      if (b.coffee.toLowerCase().startsWith(value.toLowerCase())) {
        return 1; // move b to the top
      }
      return 0; // no change in order
    });
    setFilteredEntries(sorted);
  };






  
const [filteredEntries, setFilteredEntries] = useState([]);


  console.log('UserID:', userId)

// ---------------------Get requests---------------------------


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
  

      //Parsing the response then sets coffeeEntries to the array of entyries in the fetched data if it exists and i s an array
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


// runs when component mounts or when func reference changes then send GET req to fetch coff emntries
  useEffect(() => {
    fetchCoffeeEntries();
  }, [fetchCoffeeEntries]);



// --------Get CurrentUser------------


  const fetchCurrentUser = useCallback(async () => {
    const url = `${baseURL}/user/me`;
    console.log("Current user set:", currentUser);
  
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
      console.log('Current user:', data.user);
      setCurrentUser(data.user);
  
       // Log the values right after setting the state
  console.log('First name:', data.user.firstName);
      console.log('Last name:', data.user.lastName);
  
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  }, []);



  
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);


  
// ----------------------DELETE COFFEE----------------------------------/


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


  // ------------------if creator or admin  EDIT-COFFEE----------------------
  const canEditDelete = (creatorId) => {
    if (!currentUser) {
      return false;
    }
    return currentUser._id === creatorId || currentUser.isAdmin;
  };

//----------RETURN----------------
return (
  <Box bgcolor="#3D9970" style={{ minHeight: "100vh" }}>
    <Container maxWidth="lg">
      <nav>
        <Typography variant="h4" component="h2" align="center" color="textSecondary" style={{ paddingTop: "20px", fontWeight: "lighter" }}>
          Dashboard
        </Typography>
        <TemporaryDrawer />
      </nav>

      {/* Adds welcome users name or guest on the dashboard */}
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome, {currentUser ? currentUser.firstName + ' ' + currentUser.lastName : 'Guest'}!
      </Typography>

      <div>
        <br />
        <br />

        <Autocomplete 
          freeSolo
          options={coffeeEntries.map((entry) => entry.coffee || '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search coffees"
              margin="normal"
              variant="outlined"
            />
          )}
          fullWidth
          value={search}
          onInputChange={handleSearchChange}
        />

        <br />
        <br />
        {filteredEntries.length > 0 ? (
          <Grid container spacing={4}>
            {filteredEntries.map((coffee) => (
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
  <CoffeeDetails coffeeData={coffee} imageUrl={coffee.imageUrl} />
  <Image
                      cloudName="dns9ltiu8"
                      publicId={coffee.img}
                      width="200"
                      crop="scale"
                      style={{ borderRadius: '50%' }}
                    />


</CardContent>
                  <CardActions>
                    {currentUser && canEditDelete(coffee.userId) && (
                      <>
                        <Button onClick={() => handleDeleteCoffee(coffee._id)}>Delete</Button>
                        <Link to={`/edit-coffee/${coffee._id}`}>
                          <Button>Edit</Button>
                        </Link>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No coffee entries found.</p>
        )}
      </div>
    </Container>
  </Box>
);

          }; 


export default Dashboard;


