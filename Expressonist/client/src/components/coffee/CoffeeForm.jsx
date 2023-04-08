import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment, FormControl, OutlinedInput, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { baseURL } from '../../environmnent';

function CoffeeForm(params) {
    const [roaster, setRoaster] = useState(params.initialValues.roaster);
    const [coffee, setCoffee] = useState(params.initialValues.coffee);
    const [process, setProcess] = useState(params.initialValues.process);
    const [variety, setVariety] = useState(params.initialValues.variety);
    const [elevation, setElevation] = useState(params.initialValues.elevation);
    const [roast, setRoast] = useState(params.initialValues.roast);
    const [inWeight, setInWeight] = useState(params.initialValues.inWeight);
    const [outWeight, setOutWeight] = useState(params.initialValues.outWeight);
    const [time, setTime] = useState(params.initialValues.time);
    const [grind, setGrind] = useState(params.initialValues.grind);
    const [temp, setTemp] = useState(params.initialValues.temp);
    const [wedge, setWedge] = useState(params.initialValues.wedge);
    const [wdt, setWdt] = useState(params.initialValues.wdt);
    const [rdt, setRdt] = useState(params.initialValues.rdt);
    const [notes, setNotes] = useState(params.initialValues.notes);
    const [img, setImg] = useState(params.initialValues.img);

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
        
        let url = `${baseURL}/coffee`;
        
        if (params.method === 'PUT') {
            url = url + '/' + params.id;
        }

        try {
            const response = await fetch(url, {
                method: params.method,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`, 
                },
                body: JSON.stringify(coffeeData)
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
            console.error(error);
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
    )
}

export default CoffeeForm