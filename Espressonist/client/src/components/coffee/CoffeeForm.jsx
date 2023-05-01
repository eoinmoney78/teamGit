import React,  { useEffect,  useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment, FormControl, OutlinedInput, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';






    
    function CoffeeForm(props) {
        const [imageFile, setImageFile] = useState(null);
        const [cloudinaryUrl, setCloudinaryUrl] = useState('');
        console.log("cloudinaryUrl:",cloudinaryUrl );
        
     
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
            setRoaster(props.initialValues.roaster);
            setCoffee(props.initialValues.coffee);
            setProcess(props.initialValues.process);
            setVariety(props.initialValues.variety);
            setElevation(props.initialValues.elevation);
            setRoast(props.initialValues.roast);
            setInWeight(props.initialValues.in);
            setOutWeight(props.initialValues.out);
            setTime(props.initialValues.time);
            setGrind(props.initialValues.grind);
            setTemp(props.initialValues.temp);
            setWedge(props.initialValues.wedge);
            setWdt(props.initialValues.wdt);
            setRdt(props.initialValues.rdt);
            setNotes(props.initialValues.notes);
            setImg(props.initialValues.img);
        };


        useEffect(() => {
            if (Object.values(props.initialValues).length === 0) {
              return;
            } else {
              setValues();
            }
          }, [props.initialValues]);



          const handleSubmit = async (event) => {
            event.preventDefault();
          
            try {
              // Upload the image to Cloudinary, if there's an image to upload
              let uploadedUrl = '';
              if (imageFile) {
                uploadedUrl = await handleImageUpload();
              }
          
              // Once the image is uploaded (or if there's no image), submit the form
              await submitForm(uploadedUrl);
            } catch (error) {
              console.error('Error uploading image or submitting form:', error);
            }
          };
          

          const handleImageUpload = async () => {
            if (!imageFile) {
              console.log('No image file selected');
              return Promise.resolve('');
            }
          
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('upload_preset', 'ml_default');
          
            const response = await fetch('https://api.cloudinary.com/v1_1/dns9ltiu8/image/upload', {
              method: 'POST',
              body: formData,
            });
          
            const data = await response.json();
          
            if (data.secure_url) {
              console.log('Image uploaded successfully to Cloudinary');
              setCloudinaryUrl(data.secure_url);
              return Promise.resolve(data.secure_url);
            } else {
              console.error('Cloudinary error:', data);
              return Promise.reject(data);
            }
          };
          
          const submitForm = async (uploadedUrl) => {
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
              img: uploadedUrl || cloudinaryUrl,
            };
            console.log('coffeeData:', coffeeData);
            console.log('Sending image to Cloudinary...');
            console.log("cloudinaryUrl:", cloudinaryUrl);
            console.log('coffeeData:', coffeeData);
            console.log('coffeeData:', coffeeData);

            try {
                console.log('Sending coffee data to server...');
    
                const response = await fetch(props.url, {
                    method: props.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(coffeeData)
                });
                console.log('Response from server:', response);
    
                const data = await response.json();
                console.log('Data returned from server:', data);
    
                if (response.ok) {
                    console.log('Coffee data sent successfully to server');
                    // Return to Dashboard
                    navigate('/dashboard');
                } else {
                    console.error('Error sending coffee data to server');
                }
            } catch (error) {
                console.error('Error sending coffee data to server:', error);
            }
        };
    
        // ... render form and other components
    




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
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        Upload Image
                    </Button>
                </label>
                {img && (
                    <CloudinaryContext cloudName="dns9ltiu8">
                        <Image publicId={img} width="300" crop="scale">
                            <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                    </CloudinaryContext>
                )}
            </Grid>


                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {props.submitButtonText}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default CoffeeForm; 

