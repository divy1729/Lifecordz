import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';

const Payment = () => {
    const location = useLocation();
    const orderInfo = location.state?.orderInfo;

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 8 }}>
                <GradientHeading variant="h2" gutterBottom>
                    Payment
                </GradientHeading>
                
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    {/* Display order details */}
                </Paper>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Payment Methods
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Pay Now
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Payment; 