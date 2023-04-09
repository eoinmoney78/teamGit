import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environment';
import CoffeeDetails from '../coffee/CoffeeDetails';
import TemporaryDrawer from '../layout/TemporaryDrawer';




const Home = () => {
const [userId] = useState(localStorage.getItem('user_id'));

return (

    <Container maxWidth="xs">
    <nav> <TemporaryDrawer /> </nav> 
    <Typography variant="h2" component="h1" align="center" gutterBottom>
        Expressionist
    </Typography>
    <nav><img src="cup-coffee-with-pile-coffee-beans.jpg" alt="coffeenbeans" width="400" height="250"></img></nav>
    <br></br>
    <Typography variant="h4" component="h1" align="left" gutterBottom>
        About
    </Typography>
    <p> &nbsp; &nbsp; &nbsp; &nbsp; Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum similique pariatur omnis expedita praesentium voluptates reiciendis eveniet beatae iste, mollitia temporibus aliquid. Harum aliquam officiis debitis possimus, officia porro atque veniam accusamus aperiam, eos aut rem odio, incidunt minus voluptatem sit dolor. Hic, eum alias officia quam tempore repellendus. Quas.</p>
    </Container>
    

    );
    };
    
export default Home;




