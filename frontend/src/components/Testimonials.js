import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { GradientHeading } from './StyledHeadings';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            content: "Choosing LifeCordz for our baby's stem cell banking was the best decision we made. Their professional team and state-of-the-art facilities gave us complete peace of mind.",
            avatar: "/images/avatar1.jpg"
        },
        {
            name: "Dr. Priya Sharma",
            content: "As a healthcare professional, I highly recommend LifeCordz. Their commitment to quality and advanced preservation techniques sets them apart in stem cell banking.",
            avatar: "/images/avatar2.jpg"
        },
        {
            name: "Rahul Mehta",
            content: "The entire process was smooth and well-explained. From collection to storage, LifeCordz's team was there every step of the way. Excellent service!",
            avatar: "/images/avatar3.jpg"
        }
    ];

    return (
        <Box sx={{ 
            py: 8, 
            backgroundColor: theme => theme.palette.mode === 'dark' ? 'background.paper' : '#f5f5f5'
        }}>
            <Container maxWidth="lg">
                <GradientHeading variant="h3" align="center" gutterBottom>
                    What Our Clients Say
                </GradientHeading>

                <Grid container spacing={4} sx={{ mt: 3 }}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item key={index} xs={12} md={4}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                    }
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        mb: 2 
                                    }}>
                                        <Avatar
                                            src={testimonial.avatar}
                                            sx={{ 
                                                width: 80, 
                                                height: 80, 
                                                mb: 2,
                                                bgcolor: 'primary.main'
                                            }}
                                        />
                                        <Typography 
                                            variant="h6"
                                            sx={{ 
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {testimonial.name}
                                        </Typography>
                                    </Box>
                                    <Typography 
                                        variant="body1" 
                                        align="center"
                                        sx={{ 
                                            fontStyle: 'italic',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        "{testimonial.content}"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Testimonials; 