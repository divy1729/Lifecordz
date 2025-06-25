import React from 'react';
import { Container, Typography, Box, Grid, Paper, Fade, Zoom } from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';
import { useInView } from 'react-intersection-observer';
import { styled } from '@mui/material/styles';
import Footer from '../components/Footer'; // Importing the Footer component

const HeroSection = styled(Box)( {
    position: 'relative',
    backgroundImage: 'url("/f1.avif")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        zIndex: 1
    }
});

const AnimatedSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
}));

const StyledImage = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '20px',
});

const StemCellBanking = () => {
    const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <Box>
            <HeroSection>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Fade in={true} timeout={1000}>
                        <Box>
                            <GradientHeading 
                                variant="h2" 
                                align="center" 
                                sx={{ 
                                    color: 'white',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                }}
                            >
                                Understanding Stem Cells
                            </GradientHeading>
                            <Typography 
                                variant="h5" 
                                align="center" 
                                sx={{ 
                                    color: 'white',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                }}
                            >
                                Discover the revolutionary potential of stem cells in modern medicine
                            </Typography>
                        </Box>
                    </Fade>
                </Container>
            </HeroSection>

            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* What are Stem Cells Section */}
                        <Grid item xs={12} ref={ref1}>
                            <Fade in={inView1} timeout={1000}>
                                <AnimatedSection>
                                    <Typography variant="h4" color="primary" gutterBottom>
                                        WHAT ARE STEM CELLS?
                                    </Typography>
                                    <Typography paragraph>
                                        Stem Cells are special cells with the amazing power to transform into any tissue or organ in your body. It is due to these special powers that they have the potential to treat over 80 approved life threatening diseases and disorders.
                                    </Typography>
                                    <Box sx={{ my: 3 }}>
                                        <StyledImage 
                                            src="/images/stem-cells-types.jpg" 
                                            alt="Types of Stem Cells"
                                        />
                                    </Box>
                                    <Typography paragraph>
                                        The great thing about stem cells is that they can be extracted from a number of sources, like embryo, umbilical cord, cord blood, placenta, bone marrow, teeth, etc. The most abundant source of stem cells is the placenta (chorion & decidua), amniotic sac and amniotic fluid.
                                    </Typography>
                                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                        Over 1,00,000 families have reposed faith in our banking, research and approved applications.
                                    </Typography>
                                </AnimatedSection>
                            </Fade>
                        </Grid>

                        {/* Benefits Section */}
                        <Grid item xs={12} md={6} ref={ref2}>
                            <Zoom in={inView2} timeout={1000}>
                                <AnimatedSection>
                                    <Typography variant="h4" color="primary" gutterBottom>
                                        BENEFITS OF STEM CELLS
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2 }}>
                                        <Typography component="li" paragraph>
                                            They are non-toxic and devoid of side effects compared to its toxic drug counterparts.
                                        </Typography>
                                        <Typography component="li" paragraph>
                                            Their use for therapeutic purposes can ensure lower treatment costs and promote longer lives.
                                        </Typography>
                                        <Typography component="li" paragraph>
                                            Stem cell therapy addresses both better treatment giving longer life, and lower costs.
                                        </Typography>
                                    </Box>
                                </AnimatedSection>
                            </Zoom>
                        </Grid>

                        {/* Types Section */}
                        <Grid item xs={12} md={6} ref={ref3}>
                            <Zoom in={inView3} timeout={1000}>
                                <AnimatedSection>
                                    <Typography variant="h4" color="primary" gutterBottom>
                                        TYPES OF STEM CELLS
                                    </Typography>
                                    <Typography paragraph>
                                        There are various types of stem cells that exist in the human body:
                                    </Typography>
                                    <Box sx={{ pl: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Hematopoietic stem cells (HSC)
                                        </Typography>
                                        <Typography paragraph>
                                            Found in bone marrow and cord blood, these cells form blood components.
                                        </Typography>

                                        <Typography variant="h6" gutterBottom>
                                            Mesenchymal stem cells (MSC)
                                        </Typography>
                                        <Typography paragraph>
                                            Present in the stroma, they can differentiate into various cell types including bone, fat, cartilage, and muscle.
                                        </Typography>

                                        <Typography variant="h6" gutterBottom>
                                            Pluripotent stem cells (PSC)
                                        </Typography>
                                        <Typography paragraph>
                                            These cells have characteristics of both HSC & MSC, capable of differentiating into all types of tissues.
                                        </Typography>
                                    </Box>
                                </AnimatedSection>
                            </Zoom>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer /> {/* Adding the Footer component here */}
        </Box>
    );
};

export default StemCellBanking;
