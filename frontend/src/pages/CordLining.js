import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CordLining = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <GradientHeading variant="h2" align="center" gutterBottom>
                    Understanding Cord Lining
                </GradientHeading>

                <Grid container spacing={4}>
                    {/* Umbilical Cord Section */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                                What is umbilical cord?
                            </Typography>
                            <Typography paragraph>
                                The umbilical cord is the connecting cord from the developing fetus to the placenta 
                                which allows blood to carry oxygen and nutrition to the baby in the womb. After the 
                                baby is delivered, the umbilical cord is cut and normally discarded with the placenta 
                                as medical waste until researchers became aware of its medical potential.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Cord Lining Section */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                                What is cord lining?
                            </Typography>
                            <Typography paragraph>
                                Other than containing cord blood, umbilical cord is composed of Wharton's jelly, 
                                umbilical arteries and an umbilical vein. These components are protected by a 
                                sheet-like membrane known as cord lining. While Wharton's jelly contains one type 
                                of stem cells - mesenchymal stem cells (MSCs), cord lining contains two important 
                                types of stem cells including MSCs and epithelial stem cells (EpSCs).
                            </Typography>
                            <Typography paragraph>
                                By storing a combination of HSCs, MSCs and EpSCs, you are availing your child the 
                                access to growing applications of stem cells and the therapeutic potential that they 
                                hold. These cells, only available at birth only, are the youngest and most potent 
                                cells obtainable ethically.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Quick Tip Section */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ 
                            p: 4, 
                            backgroundColor: theme => theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                            color: theme => theme.palette.mode === 'dark' ? 'white' : 'inherit'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <InfoOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold">
                                    Quick Tip
                                </Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Why should you store both cord blood and cord lining stem cells?
                            </Typography>
                            <Typography>
                                By storing a combination of HSCs, MSCs and EpSCs, you are giving your child and 
                                your family more medical options in the future. Collected at birth, these cells 
                                are the youngest and most potent adult stem cells available. Most importantly, 
                                they cannot be replaced by each other.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CordLining; 