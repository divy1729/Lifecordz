import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const CourierDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Courier Dashboard
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Pickup Schedule</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>View pickup schedule here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Mark Pickup/Delivery</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Mark pickup or delivery as complete here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Route Map</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>View route map here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Notifications</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Notify technicians upon delivery here.</Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default CourierDashboard;
