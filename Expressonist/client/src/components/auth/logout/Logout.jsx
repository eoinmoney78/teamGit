import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';


  
  

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f44336', // Red color
  color: '#ffffff', // White color
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#d32f2f', // Darker red color on hover
  },
  fontSize: '0.8rem', // reduce font size
  opacity: 0.7, // reduce opacity
}));


function Logout({ setToken }) {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem('token');
    setToken('');
    console.log('signout');
    navigate('/');
  };

  return (
    <LogoutButton onClick={signout} variant="contained">
      Logout
    </LogoutButton>
  );
}

export default Logout;

