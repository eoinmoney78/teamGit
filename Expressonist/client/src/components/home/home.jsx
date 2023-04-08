import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environmnent';
import CoffeeDetails from '../coffee/CoffeeDetails';
import TemporaryDrawer from '../layout/TemporaryDrawer';




const Home = () => {
const [coffeeEntries, setCoffeeEntries] = useState([]);
const [userId] = useState(localStorage.getItem('user_id'));

return (

    <Container maxWidth="xs">
    <nav> <TemporaryDrawer /> </nav> 
    </Container>

    );
    };
    
export default Home;




