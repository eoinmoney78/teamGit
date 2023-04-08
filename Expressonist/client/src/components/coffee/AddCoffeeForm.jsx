import React from 'react';
import { baseURL } from '../../environmnent';
import CoffeeForm from './CoffeeForm';

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