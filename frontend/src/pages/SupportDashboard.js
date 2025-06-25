import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const SupportDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Support Dashboard
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">User Queries</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>View and respond to user queries here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Ticket Management</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Manage support tickets here.</Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Chat/Email Integration</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Optional chat or email integration here.</Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default SupportDashboard;
