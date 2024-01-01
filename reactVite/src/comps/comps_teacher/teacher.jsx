

import  { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTeacher } from '../../services/teacherService';
import axios from 'axios';


const TeacherProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedHMO, setEditedHMO] = useState('');
  const [selectedHMO, setSelectedHMO] = useState('');
  const { getTeacherProfile, updateDetiles } = useTeacher();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('');
  const [editedHome, setEditedHome] = useState('');
  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeacherProfile();
        setTeacherInfo(data.data);
        setEditedEmail(data.data.email);
        setEditedFirstName(data.data.name.firstName);
        setEditedLastName(data.data.name.lastName);
        setEditedPhone(data.data.phone);
        setEditedHMO(data.data.HMO);
        setSelectedHMO(data.data.HMO);
        setSelectedCity(data.data.location.city);
        setSelectedStreet(data.data.location.street);
        setEditedHome(data.data.location.home)

      } catch (error) {
        console.error("Error fetching teacher profile:", error);
      }
    };

    fetchData();
  }, []);
// Fetch cities
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





  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await updateDetiles("email", editedEmail);
      if (response) {
        alert("Email updated");
      }
    } catch (error) {
      console.error("Error updating teacher email:", error);
    }
  };

  const handleUpdateFirstName = async () => {
    try {
      const response = await updateDetiles("name", {
        "firstName": editedFirstName,
        "lastName": editedLastName
      });
      if (response) {
        alert("First Name updated");
      }
    } catch (error) {
      console.error("Error updating teacher first name:", error);
    }
  };
  const handleUpdateLocation  = async () => {
    try {
      const response = await updateDetiles("location", {
        "city": selectedCity,
        "street": selectedStreet,
        "home": editedHome

      });
      if (response) {
        alert(" location updated");
      }
    } catch (error) {
      console.error("Error updating teacher first name:", error);
    }
  };
  const handleUpdateLastName = async () => {
    try {
      const response = await updateDetiles("name", {
        "firstName": editedFirstName,
        "lastName": editedLastName
      });
      if (response) {
        alert("Last Name updated");
      }
    } catch (error) {
      console.error("Error updating teacher last name:", error);
    }
  };

  const handleUpdatePhone = async () => {
    try {
      const response = await updateDetiles("phone", editedPhone);
      if (response) {
        alert("Phone updated");
      }
    } catch (error) {
      console.error("Error updating teacher phone:", error);
    }
  };

  const handleUpdateHMO = async () => {
    try {
      const response = await updateDetiles("HMO", selectedHMO);
      if (response) {
        alert("HMO updated");
      }
    } catch (error) {
      console.error("Error updating teacher HMO:", error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        {teacherInfo ? (
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Teacher Profile
              </Typography>
              <Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                Name: {`${editedFirstName} ${editedLastName}`}
              </Typography>
              {isEditing && (
                <div>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleUpdateFirstName}>
                    Update First Name
                  </Button>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleUpdateLastName}>
                    Update Last Name
                  </Button>
                </div>
              )}
              <Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                Email: {isEditing ? (
                  <div>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateEmail}>
                      Update Email
                    </Button>
                  </div>
                ) : (
                  editedEmail
                )}
              </Typography>
              <Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                Phone: {isEditing ? (
                  <div>
                    <TextField
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdatePhone}>
                      Update Phone
                    </Button>
                  </div>
                ) : (
                  editedPhone
                )}
              </Typography>
              <Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                HMO: {isEditing ? (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="hmo-select-label">Select HMO</InputLabel>
                      <Select
                        labelId="hmo-select-label"
                        id="hmo-select"
                        value={selectedHMO}
                        onChange={(e) => setSelectedHMO(e.target.value)}
                      >
                        <MenuItem value="clalit">Clalit</MenuItem>
                        <MenuItem value="mauchedet">Mauchedet</MenuItem>
                        <MenuItem value="leumit">Leumit</MenuItem>
                        <MenuItem value="macabi">Macabi</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleUpdateHMO}>
                      Update HMO
                    </Button>
                  </div>
                ) : (
                  editedHMO
                )}
              </Typography>
              <Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
  City: {isEditing ? (
    <div>
      <FormControl fullWidth>
        <InputLabel id="city-select-label">Select City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedStreet('');
          }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleUpdateLocation}>
        Update City
      </Button>
    </div>
  ) : (
    selectedCity
  )}
</Typography>
<Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
  Street: {isEditing ? (
    <div>
      <FormControl fullWidth>
        <InputLabel id="street-select-label">Select Street</InputLabel>
        <Select
          labelId="street-select-label"
          id="street-select"
          value={selectedStreet}
          onChange={(e) => setSelectedStreet(e.target.value)}
        >
          {streets.map((street) => (
            <MenuItem key={street} value={street}>
              {street}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleUpdateLocation}>
        Update Street
      </Button>
    </div>
  ) : (
    selectedStreet
  )}
</Typography>
<Typography variant="h6" color="textSecondary" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
  Home: {isEditing ? (
    <div>
      <TextField
        label="Home"
        variant="outlined"
        fullWidth
        value={editedHome}
        onChange={(e) => setEditedHome(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleUpdateLocation}>
        Update Home
      </Button>
    </div>
  ) : (
    editedHome
  )}
</Typography>

            </CardContent>
          </Card>
        ) : (
          <p>Loading teacher info...</p>
        )}
      </Grid>
    </Grid>
  );
};

export default TeacherProfile;

