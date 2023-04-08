import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment, FormControl, OutlinedInput, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { baseURL } from '../../environment';

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
          <FormControl fullWidth>
            <InputLabel>Elevation</InputLabel>
              <OutlinedInput 
                label='Elevation'
                type='number'
                value={elevation}
                onChange={(e) => setElevation(e.target.value)}
                inputProps={{
                  step: '100'
                }}
                endAdornment={<InputAdornment position='end'>ft</InputAdornment>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Roast</InputLabel>
              <Select
                label="Roast"
                value={roast}
                onChange={(e) => setRoast(e.target.value)}
              >
                <MenuItem value={''}>&nbsp;</MenuItem>
                <MenuItem value={'Light'}>Light</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'Dark'}>Dark</MenuItem>
              </Select>
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>In</InputLabel>
              <OutlinedInput
                label="In"
                type="number"
                value={inWeight}
                onChange={(e) => setInWeight(e.target.value)}
                inputProps={{
                  step: '0.1',
                  min: '0'
                }}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
              />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>Out</InputLabel>
              <OutlinedInput
                label="Out"
                type="number"
                value={outWeight}
                onChange={(e) => setOutWeight(e.target.value)}
                inputProps={{
                  step: '0.1',
                  min: '0'
                }}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
              />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>Time</InputLabel>
              <OutlinedInput
                label="Time"
                type='number'
                value={time}
                onChange={(e) => setTime(e.target.value)}
                inputProps={{
                  step: 5,
                  min: 0
                }}
                endAdornment={<InputAdornment position='end'>s</InputAdornment>}
              />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="Grind"
              value={grind}
              type="number"
              inputProps={{
                min: '0',
                step: '0.1'
              }}
              required
              onChange={(e) => setGrind(e.target.value)}
              fullWidth
            />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>Temp</InputLabel>
                  <OutlinedInput
                    label="Temp"
                    type="number"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    inputProps={{
                      min: '100'
                    }}
                    endAdornment={<InputAdornment position='end'>°F</InputAdornment>}
                  />
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <TextField
              label="Wedge"
              value={wedge}
              type="number"
              onChange={(e) => setWedge(e.target.value)}
              fullWidth
              inputProps={{
                step: '.1',
                min: '0'
              }}
            />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>WDT</InputLabel>
              <Select
                  label="WDT"
                  value={wdt}
                  onChange={(e) => setWdt(e.target.value)}
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
              <FormHelperText>Weiss Distribution Technique</FormHelperText>
            </FormControl>
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>RDT</InputLabel>
              <Select
                  label="RDT"
                  value={rdt}
                  onChange={(e) => setRdt(e.target.value)}
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
              <FormHelperText>Ross Droplet Technique</FormHelperText>
            </FormControl>
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