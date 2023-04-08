<<<<<<< HEAD
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment, FormControl, OutlinedInput, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { baseURL } from '../../environment';
=======
import React from 'react';
import { baseURL } from '../../environment';
import CoffeeForm from './CoffeeForm';
>>>>>>> e71f85563f7f600cd45aa57e2eddc019a2f5f2f3

//  AddCoffeeForm which renders a form to add a new coffee entry.

//  It uses state hooks to manage form input values for various fields and includes event handlers to submit the form data to a server using fetch API.

const AddCoffeeForm = () => {
//  The form fields include labels for various properties of the coffees.
  return (
    <CoffeeForm 
      method='POST'
      url={`${baseURL}/coffee`}
      initialValues={{
        roaster:'',
        coffee:'',
        process:'',
        variety:'',
        elevation:'',
        roast:'',
        inWeight:'',
        outWeight:'',
        time:'30',
        grind:'',
        temp:'200',
        wedge:'',
        wdt:false,
        rdt:false,
        notes:'',
        img:''
      }}
      errorMessage='Error adding coffee entry:'
    />
  );
}; 

export default AddCoffeeForm;