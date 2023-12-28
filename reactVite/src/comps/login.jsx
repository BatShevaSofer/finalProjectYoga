import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // יש לוודא שיש לך את react-router-dom מותקן

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    CssBaseline,
    Stack
} from '@mui/material';
import { useMain } from '../services/mainService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    const { login } = useMain();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        console.log(data);
    }, [data])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setData(await login(email, password));
        // console.log(data);
        console.log('Email:', email);
        console.log('Password:', password);
        // You can send a request to your backend for authentication
    };

    return (
        <Container component="main" maxWidth="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(to right, #ff9a9e, #fecfef)' }}>
            <CssBaseline />
            <Paper elevation={3} style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', background: 'white' }}>
                <Typography component="h1" variant="h5" style={{ color: '#ff4081' }}>
                    Login
                </Typography>
                <form style={{ width: '100%', marginTop: '16px' }} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
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
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
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

                        Login
                    </Button>
                    {/* component={RouterLink} */}
                    <Stack direction="row" spacing={1}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/forgot-password" variant="body2">
                            Forgot your password?
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/signup" variant="body2">
                            you have no already account?
                        </Link>
                    </Stack>

                </form>
            </Paper>
        </Container>
    );
};

export default Login;
