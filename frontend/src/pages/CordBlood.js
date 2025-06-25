import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';

const CordBlood = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <GradientHeading variant="h2" align="center" gutterBottom>
                    What is Cord Blood?
                </GradientHeading>

                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h5" gutterBottom color="primary">
                        Understanding Cord Blood
                    </Typography>
                    <Typography paragraph>
                        Cord blood is the blood that remains in the umbilical cord and placenta after birth. 
                        It's rich in hematopoietic stem cells, which can develop into different types of blood cells 
                        and are used in the treatment of various diseases.
                    </Typography>

                    <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                        Benefits of Cord Blood Banking
                    </Typography>
                    <Typography paragraph>
                        • Treatment of blood disorders
                        <br />
                        • Immune system disorders
                        <br />
                        • Certain types of cancers
                        <br />
                        • Metabolic disorders
                        <br />
                        • Future regenerative medicine applications
                    </Typography>

                    <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                        Collection Process
                    </Typography>
                    <Typography paragraph>
                        The collection process is safe, painless, and occurs immediately after birth. 
                        The cord blood is collected from the umbilical cord after it has been clamped and cut, 
                        causing no harm to either mother or baby.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default CordBlood; 