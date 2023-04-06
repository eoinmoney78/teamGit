
import CoffeeForm from './CoffeeForm';

import React, { useState } from 'react';
import { baseURL } from '../../environmnent';

//  AddCoffeeForm which renders a form to add a new coffee entry.

//  It uses state hooks to manage form input values for various fields and includes event handlers to submit the form data to a server using fetch API.

const AddCoffeeForm = () => {

  const [roaster, setRoaster] = useState('');
  const [coffee, setCoffee] = useState('');
  const [process, setProcess] = useState('');
  const [variety, setVariety] = useState('');
  const [elevation, setElevation] = useState('');
  const [roast, setRoast] = useState('');
  const [inWeight, setInWeight] = useState('');
  const [outWeight, setOutWeight] = useState('');
  const [time, setTime] = useState('30');
  const [grind, setGrind] = useState('');
  const [temp, setTemp] = useState('200');
  const [wedge, setWedge] = useState('');
  const [wdt, setWdt] = useState(false);
  const [rdt, setRdt] = useState(false);
  const [notes, setNotes] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    const coffeeData = {
      roaster,
      coffee,
      process,
      variety,
      elevation,
      roast,
      in: inWeight,
      out: outWeight,
      time,
      grind: Number(grind),
      temp,
      wedge,
      wdt,
      rdt,
      notes,
      img
    };
  
    console.log('coffeeData:', coffeeData);
  
    try {
      const response = await fetch(`${baseURL}/coffee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(coffeeData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add coffee entry');
      }
  
      // Clear form fields

      setRoaster('');
      setCoffee('');
      setProcess('');
      setVariety('');
      setElevation('');
      setRoast('');
      setInWeight('');
      setOutWeight('');
      setTime('');
      setGrind('');
      setTemp('');
      setWedge('');
      setWdt('');
      setRdt('');
      setNotes('');
      setImg('');
    } catch (error) {
      console.error('Error adding coffee entry:', error);
    }
  };
  

//  The form fields include labels for various properties of the coffees.
  return (
    <CoffeeForm 
      method='POST'
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