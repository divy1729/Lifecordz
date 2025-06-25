import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const YourPlans = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userPlans, setUserPlans] = useState([]);

    const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

    useEffect(() => {
        const fetchUserPlans = async () => {
            try {
                const response = await axios.get(`${API_BASE}/plans/user`, {
                    headers: { Authorization: `Bearer ${user?.token}` }
                });
                setUserPlans(response.data);
            } catch (error) {
                console.error('Failed to fetch user plans:', error);
            }
        };
        if (user) fetchUserPlans();
    }, [user]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <GradientHeading variant="h2" gutterBottom>
                    Your Plans
                </GradientHeading>

                {userPlans.length > 0 ? (
                    <Grid container spacing={3}>
                        {userPlans.map((plan) => (
                            <Grid item xs={12} key={plan.id}>
                                <Paper 
                                    elevation={3} 
                                    sx={{ 
                                        p: 3,
                                        borderLeft: 6,
                                        borderColor: 'primary.main'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="h5" gutterBottom>
                                                {plan.name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Status: <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{plan.status}</span>
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Start Date: {plan.startDate}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Expiry Date: {plan.expiryDate}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" color="primary">
                                                {plan.price}
                                            </Typography>
                                            <Button 
                                                variant="outlined" 
                                                color="primary"
                                                sx={{ mt: 1 }}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            You don't have any active plans yet.
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => navigate('/home')}
                            sx={{ mt: 2 }}
                        >
                            Browse Plans
                        </Button>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};

export default YourPlans;