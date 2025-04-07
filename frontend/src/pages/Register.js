import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GradientHeading } from '../components/StyledHeadings';
import { useAuth } from '../context/AuthContext';

const steps = ['Registration', 'OTP Verification'];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    specialty: '',
    vehicleInfo: '',
    licenseNumber: '',
  });
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    // Remove unused optional fields
    if (formData.role !== 'DOCTOR') delete payload.specialty;
    if (formData.role !== 'COURIER') delete payload.vehicleInfo;
    if (formData.role !== 'TECHNICIAN') delete payload.licenseNumber;

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setActiveStep(1);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "OTP verification failed.");
        return;
      }

      const loginData = await login(formData.email, formData.password);
      const role = loginData?.user?.role?.toLowerCase();

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (role === 'courier') {
        navigate('/courier-dashboard');
      } else if (role === 'technician') {
        navigate('/technician-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('OTP or Login error:', error);
      alert(error.message || "Something went wrong.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 ? (
            <>
              <GradientHeading variant="h4" align="center">
                Create Account
              </GradientHeading>
              <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" required>
  <InputLabel id="role-label">Role</InputLabel>
  <Select
    labelId="role-label"
    name="role"
    value={formData.role}
    onChange={handleChange}
    label="Role"
  >
    <MenuItem value="ADMIN">Admin</MenuItem>
    <MenuItem value="DOCTOR">Doctor</MenuItem>
    <MenuItem value="TECHNICIAN">Technician</MenuItem>
    <MenuItem value="DONOR">Donor</MenuItem>
    <MenuItem value="SUPPORT">Support</MenuItem>
    <MenuItem value="COURIER">Courier</MenuItem>
  </Select>
</FormControl>


                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                {/* Conditional Fields */}
                {formData.role === 'DOCTOR' && (
                  <TextField
                    fullWidth
                    label="NMC UID"
                    name="NMC UID"
                    value={formData.specialty}
                    onChange={handleChange}
                    margin="normal"
                  />
                )}
                {formData.role === 'COURIER' && (
                  <TextField
                    fullWidth
                    label="Vehicle Info"
                    name="vehicleInfo"
                    value={formData.vehicleInfo}
                    onChange={handleChange}
                    margin="normal"
                  />
                )}
                {formData.role === 'TECHNICIAN' && (
                  <TextField
                    fullWidth
                    label="License Number"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    margin="normal"
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Verify OTP
              </Typography>
              <form onSubmit={handleOtpSubmit}>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify OTP
                </Button>
              </form>
            </>
          )}

          <Typography align="center">
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
            >
              Login here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
