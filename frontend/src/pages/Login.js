import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Divider
} from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);  // Call login from AuthContext
            const role = localStorage.getItem("role");

            // Redirect user based on role
            switch (role) {
                case 'ADMIN':
                    navigate('/admin-dashboard');
                    break;
                case 'DOCTOR':
                    navigate('/doctor-dashboard');
                    break;
                case 'COURIER':
                    navigate('/courier-dashboard');
                    break;
                case 'TECHNICIAN':
                    navigate('/technician-dashboard');
                    break;
                default:
                    navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Invalid credentials');
            console.error('Login error details:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <GradientHeading variant="h4" align="center">
                        Login
                    </GradientHeading>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Login
                        </Button>
                    </form>

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Divider>
                            <Typography variant="body2" color="textSecondary">
                                OR
                            </Typography>
                        </Divider>
                    </Box>

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => navigate('/register')}
                    >
                        Create New Account
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
