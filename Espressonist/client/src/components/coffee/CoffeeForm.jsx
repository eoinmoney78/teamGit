import React,  { useEffect,  useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment, FormControl, OutlinedInput, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function CoffeeForm(params) {
    
    const navigate = useNavigate();

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

    const setValues = () => {
        setRoaster(params.initialValues.roaster);
        setCoffee(params.initialValues.coffee);
        setProcess(params.initialValues.process);
        setVariety(params.initialValues.variety);
        setElevation(params.initialValues.elevation);
        setRoast(params.initialValues.roast);
        setInWeight(params.initialValues.in);
        setOutWeight(params.initialValues.out);
        setTime(params.initialValues.time);
        setGrind(params.initialValues.grind);
        setTemp(params.initialValues.temp);
        setWedge(params.initialValues.wedge);
        setWdt(params.initialValues.wdt);
        setRdt(params.initialValues.rdt);
        setNotes(params.initialValues.notes);
        setImg(params.initialValues.img);
    }
    useEffect(() => {
        if (Object.values(params.initialValues).length === 0) {
            return;
        } else {
            setValues();
         }
    }, [params.initialValues])

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        let uploadedImgUrl = img;
        if (img && typeof img !== 'string') {
          uploadedImgUrl = await uploadImage();
        }
      
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
          img: uploadedImgUrl,
        };
      
        console.log('coffeeData:', coffeeData);
      
        try {
          const response = await fetch(params.url, {
            method: params.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(coffeeData)
          });
          console.log('response:', response);
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || 'Failed to add coffee entry');
          }
      
          // Return to Dashboard
          navigate('/dashboard');
        } catch (error) {
          console.error(error);
        }
      };


    async function getSignedUrl() {
        try {
          const response = await fetch('/generate-upload-url');
          console.log('Response:', response);
          const data = await response.json();
          console.log('Data:', data);
          return data.uploadURL;
        } catch (error) {
          console.error('Error getting signed URL:', error);
        }
      }

      async function uploadImage() {
        const fileInput = document.getElementById("image-file");
      
        if (!fileInput) {
          alert("Please select a file");
          return;
        }
      
        const file = fileInput.files[0];
      
        if (!file) {
          alert("Please select a file");
          return;
        }
      
        try {
          // Get the signed URL from the server using getSignedUrl function
          const uploadURL = await getSignedUrl();
      
          // Upload the file to S3
          const uploadResponse = await fetch(uploadURL, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type
            }
            
          });
      
          if (!uploadResponse.ok) {
            throw new Error("Failed to upload the file");
          }
      
          alert("Image uploaded successfully");
          setImg(uploadURL); // Update state with the uploaded image URL
      
          return uploadURL; // Return the uploaded image URL
        } catch (error) {
          console.error("Upload error:", error.message);
          alert("Image upload failed");
        }
      }
      





      
    return (
        <form onSubmit={handleSubmit}>
            
            <Typography variant="h6" gutterBottom>
                Update Coffee Entry
            </Typography>
            <Grid item xs={12}>
 
</Grid>

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
                        label="Tasting Notes"
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
                            {params.submitButtonText}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default CoffeeForm; 



