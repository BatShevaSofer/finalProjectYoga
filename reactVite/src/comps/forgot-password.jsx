import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { Link  } from 'react-router-dom';
import { useMain } from '../services/mainService'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const { sendMail, resetP } = useMain();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSendCode = async (event) => {
    event.preventDefault();

    await sendMail(email);
    setStep(2);

  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    await resetP(email, newPassword, verificationCode);
    setStep(3);

  };

  return (
    <Container component="main" maxWidth="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(to right, #ff9a9e, #fecfef)' }}>
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', background: 'white' }}>
        <Typography component="h1" variant="h5" style={{ color: '#ff4081' }}>
          Forgot Password
        </Typography>
        {step == 1 && (
          <form style={{ width: '100%', marginTop: '16px' }} onSubmit={handleSendCode}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '16px 0 8px', background: '#ff4081', transition: 'background 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff6e98'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4081'}
            >
              Send Verification Code
            </Button>
          </form>
        )}
        {step == 2 && (
          <form style={{ width: '100%', marginTop: '16px' }} onSubmit={handleResetPassword}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="verificationCode"
              label="Verification Code"
              type="text"
              id="verificationCode"
              autoComplete="off"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
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
              Reset Password
            </Button>
          </form>
        )}
        {step === 3 && (
          <Typography variant="body1">
            Password reset successfully! <Link to="/login">Login</Link>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
