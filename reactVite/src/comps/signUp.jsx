
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useMain } from '../services/mainService';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';
import { v4 } from 'uuid'

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
    InputAdornment,
} from '@mui/material';

const Signup = () => {

    const imageRef = useRef(null);
    const [idNumber, setIdNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [hmo, setHmo] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [dataS, setDataS] = useState('');
    const [gender, setGender] = useState('');
    const [home, setHome] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const { signUp } = useMain();

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

    const uploadImage = async () => {
        try {
            if (imageUpload == null) return;
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
            await uploadBytes(imageRef, imageUpload);
            const imageUrl = await getDownloadURL(imageRef);

            return imageUrl;

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const handleImageChange = async (e,) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };


    const handleHmoChange = (event) => {
        setHmo(event.target.value);
    };

    const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value);

        const birthdateObj = new Date(event.target.value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthdateObj.getFullYear();

        if (age < 3) {
            alert("Age is too young! Please enter a valid birthdate.");

            console.error("Age is too young!");
        }
    };

    const handleStreetChange = (event) => {
        setStreet(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleHomeChange = (event) => {
        setHome(event.target.value);
    };
    useEffect(() => {
        console.log(dataS);
    }, [dataS])

    useEffect(() => {
        console.log(selectedCity);
    }, [selectedCity]);

    useEffect(() => {
        console.log(image);
    }, [image]);

    useEffect(() => {
        axios
            .get('https://data.gov.il/api/3/action/datastore_search', {
                params: {
                    resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
                    limit: 32000,
                },
                responseType: 'json',
            })
            .then((response) => {
                const cityRecords = response?.data?.result?.records || [];
                const uniqueCities = Array.from(new Set(cityRecords.map((city) => city['שם_ישוב'])));
                setCities(uniqueCities);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            axios
                .get('https://data.gov.il/api/3/action/datastore_search', {
                    params: {
                        resource_id: 'a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3',
                        q: selectedCity,
                        limit: 3200,
                    },
                    responseType: 'json',
                })
                .then((response) => {
                    const streetRecords = response?.data?.result?.records || [];
                    const uniqueStreets = Array.from(new Set(streetRecords.map((street) => street['שם_רחוב'])));
                    setStreets(uniqueStreets);
                })
                .catch((error) => {
                    console.error('Error fetching streets:', error);
                });
        }
    }, [selectedCity]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        uploadImage().then(async (response) => {
            setDataS(await signUp(idNumber, firstName, lastName, email, password, phone, hmo, birthdate, city, street, home, gender, response));

        }).catch((error) => { console.log(error) });

        console.log('ID Number:', idNumber);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Password:', password);
        console.log('Image File:', image);
        console.log('HMO:', hmo);
        console.log('city:', city);
        console.log('street:', street);
        console.log('Birthdate:', birthdate);
        console.log('Home:', home);
        console.log('Gender:', gender);
    };

    return (
        <Container
            component="main"
            maxWidth=""
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                background: 'linear-gradient(to right, #ff9a9e, #fecfef)',
            }}
        >
            <CssBaseline />
            <Paper
                elevation={3}
                style={{
                    width: '60%',
                    margin: '10px',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '80%',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    background: 'white',
                }}
            >
                <Typography component="h1" className='mt-3' variant="h5" style={{ color: '#ff4081' }}>
                    Sign Up
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" className='mt-2'>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#ff4081' }}>
                        Login
                    </Link>
                </Typography>
                <form
                    style={{ width: '70%', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    onSubmit={handleSubmit}
                >
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
                        onChange={(e) => handleImageChange(e)}
                    />
                    <label htmlFor="image-upload">
                        <Button
                            className='mt-4'
                            variant="outlined"
                            component="span"
                            fullWidth

                            style={{ borderColor: '#ff4081', color: '#ff4081', marginBottom: '16px' }}
                        >
                            Upload Image
                        </Button>
                    </label>
                    {image && (
                        <div ref={imageRef}
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                borderRadius: '50%',
                                margin: '8px',
                            }}
                        ></div>
                    )}





                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel id="city_label">City</InputLabel>
                        <Select labelId="city_label" id="city" label="City" name="city" value={city} onChange={(e) => { setSelectedCity(e.target.value); handleCityChange(e); }}>
                            {cities && cities.map((city) => (
                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel id="street_label">Street</InputLabel>
                        <Select labelId="street_label" id="street" label="Street" name="street" value={street} onChange={handleStreetChange}>
                            {streets && streets.map((street) => (
                                <MenuItem key={street} value={street}>{street}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>






                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel id="hmo-label">HMO</InputLabel>
                        <Select labelId="hmo-label" id="hmo" label="HMO" name="hmo" value={hmo} onChange={handleHmoChange}>
                            <MenuItem value="meuhedet">Meuhedet</MenuItem>
                            <MenuItem value="maccabi">Maccabi</MenuItem>
                            <MenuItem value="clalit">Clalit</MenuItem>
                            <MenuItem value="leumit">Leumit</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal" required>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select labelId="gender-label" id="gender" label="Gender" name="gender" value={gender} onChange={handleGenderChange}>
                            <MenuItem value="false">Male</MenuItem>
                            <MenuItem value="true">Female</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="home"
                        label="Home Number"
                        name="home"
                        value={home}
                        onChange={handleHomeChange}
                    />
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
                            style: { marginLeft: '25px' },
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"> birthdate:</InputAdornment>,
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                            margin: '16px 0 8px',
                            background: '#ff4081',
                            transition: 'background 0.3s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff6e98')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4081')}
                    >
                        Sign Up
                    </Button>
                </form>

            </Paper>
        </Container>
    );
};

export default Signup;

