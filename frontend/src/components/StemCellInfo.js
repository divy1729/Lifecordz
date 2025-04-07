import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { GradientHeading } from './StyledHeadings';
import { useNavigate } from 'react-router-dom';

const StemCellInfo = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ py: 8, backgroundColor: theme => theme.palette.mode === 'dark' ? 'background.paper' : '#f5f5f5' }}>
            <Container maxWidth="lg">
                <GradientHeading variant="h3" align="center" gutterBottom>
                    The Future of Stem Cells
                </GradientHeading>
                
                <Typography variant="h6" align="center" paragraph sx={{ mb: 6 }}>
                    Stem cells are at the forefront of one of the most fascinating and revolutionary areas of medicine today. 
                    At your baby's birth, you have the unique opportunity to safeguard the health of the ones you love by 
                    storing his/her precious cord blood stem cells.
                </Typography>

                <Grid container spacing={6} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ 
                            textAlign: 'center',
                            p: 3,
                            height: '100%',
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1
                        }}>
                            <img 
                                src="/cord-blood.png" 
                                alt="Cord Blood" 
                                style={{ 
                                    width: '200px', 
                                    height: '200px',
                                    marginBottom: '20px'
                                }}
                            />
                            <Typography variant="h5" gutterBottom>
                                What is Cord Blood?
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => navigate('/stem-cell-banking/cord-blood')}
                                sx={{ mt: 2 }}
                            >
                                Learn More
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ 
                            textAlign: 'center',
                            p: 3,
                            height: '100%',
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1
                        }}>
                            <img 
                                src="/cord-lining.png" 
                                alt="Cord Lining" 
                                style={{ 
                                    width: '200px', 
                                    height: '200px',
                                    marginBottom: '20px'
                                }}
                            />
                            <Typography variant="h5" gutterBottom>
                                What is Cord Lining?
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => navigate('/stem-cell-banking/cord-lining')}
                                sx={{ mt: 2 }}
                            >
                                Learn More
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default StemCellInfo; 