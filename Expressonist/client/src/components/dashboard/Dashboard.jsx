

















// import React, { useState, useEffect } from 'react';
// import { Container, Typography } from '@mui/material';
// import AddCoffeeForm from '../coffee/AddCoffeeForm';

// const Dashboard = () => {
//   const [coffeeEntries, setCoffeeEntries] = useState([]);

//   useEffect(() => {
//     fetchCoffeeEntries();
//   }, []);

//   const fetchCoffeeEntries = async () => {
//     // Replace this URL with your API's base URL
//     const Url = 'https://localhost:4004/coffee';

//     try {
//       const response = await fetch(Url, {
//         headers: {
//           'Authorization': ` ${localStorage.getItem('token')}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch coffee entries');
//       }

//       setCoffeeEntries(data);
//     } catch (error) {
//       console.error('Error fetching coffee entries:', error);
//     }
//   };

//   const addCoffee = async (coffee) => {
//     // Replace this URL with your API's base URL
//     const Url = 'https://localhost:40004/coffee';

//     try {
//       const response = await fetch(Url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': ` ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(coffee),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to add coffee entry');
//       }

//       // Update the coffeeEntries state with the new entry
//       setCoffeeEntries([...coffeeEntries, [data]]);
//     } catch (error) {
//       console.error('Error adding coffee entry:', error);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Typography variant="h2" component="h1" align="center" gutterBottom>
//         Dashboard
//       </Typography>

//       <Typography variant="h4" component="h2" align="center" gutterBottom>
//         Coffee Entries
//       </Typography>
//       {coffeeEntries.map(entry => (
//         <div key={entry.id}>
//           <Typography variant="h5" component="h3" gutterBottom>
//             {entry.name}
//           </Typography>s
//           <Typography variant="body1" gutterBottom>
//             Date: {entry.date}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Rating: {entry.rating}
//           </Typography>
//           <hr />
//         </div>
//       ))}

//       <AddCoffeeForm addCoffee={addCoffee} />
//     </Container>
//   );
// };

// export default Dashboard;















import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import AddCoffeeForm from '../coffee/AddCoffeeForm';

const Dashboard = () => {
  const [coffeeEntries, setCoffeeEntries] = useState([]);

  useEffect(() => {
    fetchCoffeeEntries();
  }, []);

  const fetchCoffeeEntries = async () => {
    // Replace this URL with your API's base URL
    const Url = 'https://localhost:4004/coffee';

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

  const addCoffee = async (coffeeData) => {
    // Replace this URL with your API's base URL
    const Url = 'https://localhost:4004/';
    try {
        console.log('url:', Url);
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(coffeeData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add coffee entry');
      }

      // Update the coffeeEntries state with the new entry
      setCoffeeEntries([...coffeeEntries, data]);

      // Optionally, display a success message to the user
      console.log('Coffee entry added successfully!');
    } catch (error) {
      console.error('Error adding coffee entry:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Dashboard
      </Typography>

      <AddCoffeeForm onAddCoffee={addCoffee} />
    </Container>
  );
};

export default Dashboard;
