import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment, FormControl, OutlinedInput, InputLabel } from '@mui/material';
import NumberInput from 


const AddCoffeeForm = ({ onAddCoffee }) => {
  const [roaster, setRoaster] = useState('');
  const [coffee, setCoffee] = useState('');
  const [process, setProcess] = useState('');
  const [variety, setVariety] = useState('');
  const [elevation, setElevation] = useState('');
  const [roast, setRoast] = useState('');
  const [inWeight, setInWeight] = useState('');
  const [outWeight, setOutWeight] = useState('');
  const [time, setTime] = useState('');
  const [grind, setGrind] = useState('');
  const [temp, setTemp] = useState('');
  const [wedge, setWedge] = useState('');
  const [wdt, setWdt] = useState('');
  const [rdt, setRdt] = useState('');
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
      const response = await fetch('https://localhost:4004/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(coffeeData),
      });
  
      console.log('response:', response);
  
      const data = await response.json();
  
      console.log('data:', data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add coffee entry');
      }
  
      // onAddCoffee(data.newCoffee);
  
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
  

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add Coffee Entry
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Roaster"
            value={roaster}
            required
            onChange={(e) => setRoaster(e.target.value)}
            fullWidth
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Coffee"
            value={coffee}
            required
            onChange={(e) => setCoffee(e.target.value)}
            fullWidth
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Process"
            value={process}
            required
            onChange={(e) => setProcess(e.target.value)}
            fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Variety"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            fullWidth
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel>Elevation</InputLabel>
                <OutlinedInput 
                  label='Elevation'
                  type='number'
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                  fullWidth
                  endAdornment={<InputAdornment position='end'>ft</InputAdornment>}
                />
              </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="Roast"
              value={roast}
              onChange={(e) => setRoast(e.target.value)}
              fullWidth
              />
          </Grid>
      
          <Grid item xs={12} sm={6}>
              <FormControl required>
                <InputLabel >In</InputLabel>
                <OutlinedInput
                  label="In"
                  type="number"
                  value={inWeight}
                  onChange={(e) => setInWeight(e.target.value)}
                  fullWidth
                  endAdornment={<InputAdornment position="end">g</InputAdornment>}
                />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl required>
              <InputLabel >Out</InputLabel>
              <OutlinedInput
                label="Out"
                type="number"
                value={outWeight}
                onChange={(e) => setOutWeight(e.target.value)}
                fullWidth
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl required>
              <InputLabel >Time</InputLabel>
              <OutlinedInput
                label="Time"
                type='number'
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                endAdornment={<InputAdornment position='end'>s</InputAdornment>}
                inputprops={{
                  step: 5,
                  min: 0,
                  max: 99999,
                  type: 'number',
                }}
              />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="Grind"
              value={grind}
              type="number"
              required
              onChange={(e) => setGrind(e.target.value)}
              fullWidth
              />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="Temp"
              value={temp}
              type="number"
              required
              onChange={(e) => setTemp(e.target.value)}
              fullWidth
              />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="Wedge"
              value={wedge}
              type="number"
              onChange={(e) => setWedge(e.target.value)}
              fullWidth
              />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="WDT"
              value={wdt}
              required
              onChange={(e) => setWdt(e.target.value)}
              fullWidth
              />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="RDT"
              value={rdt}
              required
              onChange={(e) => setRdt(e.target.value)}
              fullWidth
            />
          </Grid>
      
          <Grid item xs={12}>
            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
      
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              fullWidth
            />
          </Grid>
      
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
             
              >
                Add Coffee Entry
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

     );
}; 
      export default AddCoffeeForm;