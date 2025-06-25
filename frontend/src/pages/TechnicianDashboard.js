import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TechnicianDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Technician Dashboard
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Incoming Samples</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Track incoming samples here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Test Results</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Log test results here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Sample Status</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Update sample status here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Notifications</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Notify doctor/admin of issues here.</Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default TechnicianDashboard;
