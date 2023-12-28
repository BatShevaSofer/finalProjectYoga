
import React, { useState, useEffect } from 'react';
import { useMain } from '../services/mainService';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    CssBaseline,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';

const Signup = () => {
    const [idNumber, setIdNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [hmo, setHmo] = useState('');
    const [birthdate, setBirthdate] = useState('');
    // const [city, setCity] = useState('');
    // const [cities, setCities] = useState([]);
    const [dataS, setDataS] = useState('');
    const { signUp } = useMain();
    const api_url = 'https://data.gov.il/api/3/action/datastore_search';
    const cities_resource_id = '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba';
    const streets_resource_id = 'a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3';
    const city_name_key = 'שם_ישוב';
    const street_name_key = 'שם_רחוב';
  
    // State
    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    const handleIdNumberChange = (event) => {
        setIdNumber(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(URL.createObjectURL(selectedImage)); // Create a URL for the selected image
    };

    const handleHmoChange = (event) => {
        setHmo(event.target.value);
    };

    const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value);
    };


    // const handleCityChange = (event) => {
    //     setCity(event.target.value);
    // };

    useEffect(() => {
        console.log(dataS);

    }, [dataS])
    // useEffect(() => {
    //     // Fetch cities from the API
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(' https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab');

    //             setCities(response.data.result.records);
    //         } catch (error) {
    //             console.error('Error fetching cities:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Fetch cities
  useEffect(() => {
    axios
      .get(api_url, {
        params: {
          resource_id: cities_resource_id,
          limit: 32000,
        },
        responseType: 'json',
      })
      .then((response) => {
        const cityRecords = response?.data?.result?.records || [];
        setCities(cityRecords);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  // Fetch streets when the selected city changes
  useEffect(() => {
    if (selectedCity) {
      axios
        .get(api_url, {
          params: {
            resource_id: streets_resource_id,
            q: selectedCity,
            limit: 32000,
          },
          responseType: 'json',
        })
        .then((response) => {
          const streetRecords = response?.data?.result?.records || [];
          setStreets(streetRecords);
        })
        .catch((error) => {
          console.error('Error fetching streets:', error);
        });
    }
  }, [selectedCity]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Image File:', image);
        setDataS(await signUp(idNumber, firstName, lastName, email, password, phone, hmo, birthdate));
        // Add your Signup logic here using state values
        console.log('ID Number:', idNumber);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Password:', password);
        console.log('Image File:', image);
        console.log('HMO:', hmo);
        console.log('Birthdate:', birthdate);
        // You can send a request to your backend for user registration
    };

    return (
        <Container component="main" maxWidth="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'linear-gradient(to right, #ff9a9e, #fecfef)' }}>
            <CssBaseline />
            <Paper elevation={3} style={{ width:"50%", margin: '30px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80%', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', background: 'white' }}>
                <Typography component="h1" variant="h5" style={{ color: '#ff4081' }}>
                    Sign Up
                </Typography>
                <form className='m-4' style={{ width: '50%', marginTop: '16px' }} onSubmit={handleSubmit}>
                    {/* Add the new fields here */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="idNumber"
                        label="ID Number"
                        name="idNumber"
                        value={idNumber}
                        onChange={handleIdNumberChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                    />

                    <label htmlFor="image-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            fullWidth
                            // style={{ margin: '16px 0', borderColor: '#ff4081', color: '#ff4081' }}
                            style={{ borderColor: '#ff4081', color: '#ff4081', marginBottom: '16px' }}
                        >
                            Upload Image
                        </Button>
                    </label>

                    {image && (
                        <div
                            style={{
                                width: '50px', // Set a fixed width for the circular image
                                height: '50px', // Set a fixed height for the circular image
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                borderRadius: '50%',
                                margin: '8px',
                            }}
                        ></div>
                    )}


                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel id="city-label">City</InputLabel>
                        {/* <Select
                            labelId="city-label"
                            id="city"
                            label="City"
                            name="city"
                            value={city}
                            onChange={handleCityChange}
                        >
                            {cities.map((cityData) => (
                                <MenuItem key={cityData._id} value={cityData.שם_ישוב_לועזי}>{cityData.שם_ישוב_לועזי}</MenuItem>
                            ))}
                        </Select> */}

<div>
      {/* <label htmlFor="city-choice">Select a city:</label> */}
      <select
        id="city-choice"
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value=""></option>
        {cities.map((city) => (
          <option key={city[city_name_key]} value={city[city_name_key]}>
            {city[city_name_key]}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="street-choice">Select a street:</label>
      <select id="street-choice">
        <option value="">-- Select a street --</option>
        {streets.map((street) => (
          <option key={street[street_name_key]} value={street[street_name_key]}>
            {street[street_name_key]}
          </option>
        ))}
      </select>
    </div>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel id="hmo-label">HMO</InputLabel>
                        <Select
                            labelId="hmo-label"
                            id="hmo"
                            label="HMO"
                            name="hmo"
                            value={hmo}
                            onChange={handleHmoChange}
                        >
                            <MenuItem value="meuhedet">Meuhedet</MenuItem>
                            <MenuItem value="maccabi">Maccabi</MenuItem>
                            <MenuItem value="clalit">Clalit</MenuItem>
                            <MenuItem value="leumit">Leumit</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="date"
                        id="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        value={birthdate}
                        onChange={handleBirthdateChange}
                        InputLabelProps={{
                            style: { marginLeft: '25px' }, // Adjust the top margin as needed
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '16px 0 8px', background: '#ff4081', transition: 'background 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff6e98'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4081'}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Signup;