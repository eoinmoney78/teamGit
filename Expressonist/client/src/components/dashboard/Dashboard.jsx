import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environmnent';
import CoffeeDetails from '../coffee/CoffeeDetails';
import TemporaryDrawer from '../layout/TemporaryDrawer';

// The Component Dashboard  sets the initial state of coffeeEntries as an empty array, and userId as the user_id value  from local storage.
const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]);
  const [userId] = useState(localStorage.getItem('user_id'));

  console.log("UserID:", userId)

  // With FetchCoffeeEntries the useCallBack was added due to the coffees keep rendering on the console  so this way the it doesn't get recreated on every render.

  const fetchCoffeeEntries = useCallback(async () => {
  const url = `${baseURL}/coffee/getall/${userId}`;
  
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
//  if successful, the function uses await to parse the response data as JSON and logs it to the console.
      console.log('Fetched coffee entries:', data);

//  If the data includes an array of coffee entries, the function filters this array to include only entries with a userId value that matches the current user ID, 
      if (data && Array.isArray(data.coffeeEntries)) {
        const filteredData = data.coffeeEntries.filter(entry => String(entry.userId)
          === String(localStorage.getItem('user_id')));

        console.log('Filtered coffee entries:', filteredData);
        // update dashboard with the fetched filtered data
        setCoffeeEntries(filteredData);
      } else {
        console.error('Error fetching coffee entries: data.coffeeEntries is not an array');
      }
    } catch (error) {
      console.error('Error fetching coffee entries:', error.message);
    }
  }, [userId]);


  // this calls the fetchCoffeeEntries function when the component mounts and whenever fetchCoffeeEntries or userId changes.
  useEffect(() => {
    fetchCoffeeEntries();
  }, [fetchCoffeeEntries, userId]);

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

    // this displays the coffee entries on the dashboardand adds delete and edit for each one
    <Container maxWidth="xs">
      <nav> <TemporaryDrawer /> </nav> 
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Dashboard
      </Typography>
      <div>
        <br />
        <br />

        <br />
        <br />

        {/* checks if there are any entries and if there are, it maps over the array and makes a div element for each coffee , they have a unique key basedon the coffe enrty's id*/}

        {coffeeEntries.length > 0 ? (
          coffeeEntries.map((coffee) => (
            <div key={coffee._id}>

              <CoffeeDetails coffeeData={coffee} />

              {/* the handleDeleteCoffee function is called when the delete button is  */}
              <button onClick={() => handleDeleteCoffee(coffee._id)}>
                Delete
              </button>

              {/*  The Link component is used to navigate to the EditCoffeePage component when the Edit button is clicked.
              */}
              <Link to={`/edit-coffee/${coffee._id}`}>
                <button>Edit</button>
              </Link>

              <hr />
            </div>
          ))
        ) : (
          <p>No coffee entries yet. Add some!</p>
        )}
      </div>
    </Container>
      );
    };
    
    export default Dashboard;