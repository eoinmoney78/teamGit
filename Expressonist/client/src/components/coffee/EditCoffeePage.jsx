import React, { useState, useEffect } from 'react';

import { TextField, Button, Grid, Typography, Box } from '@mui/material';






const EditCoffeePage = ({ coffeeData, onSubmit }) => {


  const [roaster, setRoaster] = useState('');
  const [coffee, setCoffee] = useState('');
  const [process, setProcess] = useState('');
  const [variety, setVariety] = useState('');
  const [elevation, setElevation] = useState('');
  const [roast, setRoast] = useState('');
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [time, setTime] = useState('');
  const [grind, setGrind] = useState('');
  const [temp, setTemp] = useState('');
  const [wedge, setWedge] = useState('');
  const [wdt, setWdt] = useState('');
  const [rdt, setRdt] = useState('');
  const [notes, setNotes] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    if (coffeeData) {
      setRoaster(coffeeData.roaster);
      setCoffee(coffeeData.coffee);
      setProcess(coffeeData.process);
      setVariety(coffeeData.variety);
      setElevation(coffeeData.elevation);
      setRoast(coffeeData.roast);
      setInTime(coffeeData.in);
      setOutTime(coffeeData.out);
      setTime(coffeeData.time);
      setGrind(coffeeData.grind);
      setTemp(coffeeData.temp);
      setWedge(coffeeData.wedge);
      setWdt(coffeeData.wdt);
      setRdt(coffeeData.rdt);
      setNotes(coffeeData.notes);
      setImg(coffeeData.img);
    }
  }, [coffeeData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedCoffeeData = {
        roaster,
        coffee,
        process,
        variety,
        elevation: Number(elevation),
        roast,
        in: Number(inTime),
        out: Number(outTime),
        time: Number(time),
        grind: Number(grind),
        temp: Number(temp),
        wedge: Number(wedge),
        wdt: Boolean(wdt),
        rdt: Boolean(rdt),
        notes,
        img,
      };
      await onSubmit(updatedCoffeeData);
      alert('Coffee entry updated successfully!');
      console.log('Coffee entry updated successfully!');
    } catch (error) {
      console.error('Error updating coffee entry:', error.message);
      alert('Error updating coffee entry. Please try again later.');
    }
  };

  return (
    
    
    <form onSubmit={handleSubmit}>
  <Typography variant="h6" gutterBottom>
    Update Coffee Entry
  </Typography>
  <Grid container spacing={2}>
    <Grid item xs={8} sm={4}>
      <TextField
        label="Roaster"
        value={roaster}
        onChange={(e) => setRoaster(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        }}
        />
    </Grid>
    <Grid item xs={8} sm={4}>
      <TextField
        label="Coffee"
        value={coffee}
        onChange={(e) => setCoffee(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        }}
        />
    </Grid>
    <Grid item xs={8} sm={4}>
      <TextField
        label="Process"
        value={process}
        onChange={(e) => setProcess(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        }}
        />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Variety"
        value={variety}
        onChange={(e) => setVariety(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        }}
        />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Elevation"
        value={elevation}
        onChange={(e) => setElevation(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        }}
        />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Roast"
        value={roast}
        onChange={(e) => setRoast(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        }}
        />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="In Time"
        value={inTime}
        onChange={(e) => setInTime(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0,0.23)',
          },
        }}
        />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="Out Time"
          value={outTime}
          onChange={(e) => setOutTime(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="Grind"
          value={grind}
          onChange={(e) => setGrind(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="Temp"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="Wedge"
          value={wedge}
          onChange={(e) => setWedge(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      }}
      />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="WDT"
          value={wdt}
          onChange={(e) => setWdt(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          label="RDT"
          value={rdt}
          onChange={(e) => setRdt(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
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
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
          label="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
          />
          </Grid>
          <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
          Update Coffee
          </Button>
          </Box>
          </Grid>
          </Grid>
          </form>




);
};


export default EditCoffeePage;





//     <form onSubmit={handleSubmit}>
//       <Typography variant="h6" gutterBottom>
//         Update Coffee Entry
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={8} sm={4}>
//           <TextField
//           className={classes.textField}
//             label="Roaster"
//             value={roaster}
//             onChange={(e) => setRoaster(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={8} sm={4}>
//           <TextField
//             label="Coffee"
//             value={coffee}
//             onChange={(e) => setCoffee(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={8} sm={4}>
//           <TextField
//             label="Process"
//             value={process}
//             onChange={(e) => setProcess(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Variety"
//             value={variety}
//             onChange={(e) => setVariety(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Elevation"
//             value={elevation}
//             onChange={(e) => setElevation(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Roast"
//             value={roast}
//             onChange={(e) => setRoast(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="In Time"
//             value={inTime}
//             onChange={(e) => setInTime(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Out Time"
//             value={outTime}
//             onChange={(e) => setOutTime(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Grind"
//             value={grind}
//             onChange={(e) => setGrind(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Temp"
//             value={temp}
//             onChange={(e) => setTemp(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Wedge"
//             value={wedge}
//             onChange={(e) => setWedge(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="WDT"
//             value={wdt}
//             onChange={(e) => setWdt(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="RDT"
//             value={rdt}
//             onChange={(e) => setRdt(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//   <TextField 
//     label="Notes"
//     value={notes}
//     onChange={(e) => setNotes(e.target.value)}
//     fullWidth
//     multiline
//     rows={4}
//   />
// </Grid>
// <Grid item xs={12}>
//   <TextField 
//     label="Image URL"
//     value={img}
//     onChange={(e) => setImg(e.target.value)}
//     fullWidth
//   />
// </Grid>
// <Grid item xs={12}>
//   <Box display="flex" justifyContent="flex-end">
//     <Button type="submit" variant="contained" color="primary">
//       Update Coffee
//     </Button>
//   </Box>
// </Grid>
// </Grid>
// </form>
