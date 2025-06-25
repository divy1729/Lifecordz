import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const DoctorDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Doctor Dashboard
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Assigned Patients/Donors</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>List of assigned patients and donors will be displayed here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Stem Cell Reports</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>View and verify stem cell reports here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Sample Approvals</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Approve samples for banking here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Courier Pickup Requests</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Request courier pickups here.</Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default DoctorDashboard;
