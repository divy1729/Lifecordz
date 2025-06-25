import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const SliderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '80vh',
    overflow: 'hidden',
}));

const SlideImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease-in-out',
    transform: 'translateZ(0)',
    willChange: 'transform',
}));

const SlideContent = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    zIndex: 2,
}));

const SlideOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
}));

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Secure Your Child's Future",
            subtitle: "Store Stem Cells Today for a Healthier Tomorrow",
            buttonText: "Learn More",
            image: "/p1.png"  
        },
        {
            title: "Advanced Stem Cell Storage",
            subtitle: "State-of-the-art Facilities for Long-term Preservation",
            buttonText: "Our Technology",
            image: "/p2.png"
        },
        {
            title: "Trusted by Thousands",
            subtitle: "Join the Leading Stem Cell Bank in India",
            buttonText: "View Plans",
            image: "/p3.png"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const images = document.querySelectorAll('.parallax-slide');
            images.forEach((img) => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                img.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <SliderContainer>
            {slides.map((slide, index) => (
                <SlideImage
                    key={index}
                    src={slide.image}
                    alt={slide.title}
                    className="parallax-slide"
                    sx={{
                        opacity: index === currentSlide ? 1 : 0,
                        zIndex: index === currentSlide ? 0 : -1,
                    }}
                />
            ))}
            <SlideOverlay />
            <SlideContent>
                <Container maxWidth="md">
                    <Typography 
                        variant="h2" 
                        gutterBottom
                        sx={{ 
                            background: 'linear-gradient(45deg, #FFFFFF 30%, #E0E0E0 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {slides[currentSlide].title}
                    </Typography>
                    <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{
                            color: 'white',
                            fontWeight: '500',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            mb: 4,
                            letterSpacing: '0.02em',
                        }}
                    >
                        {slides[currentSlide].subtitle}
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => {
                        
                            if (slides[currentSlide].buttonText === "View Plans") {
                                
                                document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        {slides[currentSlide].buttonText}
                    </Button>
                </Container>
            </SlideContent>
        </SliderContainer>
    );
};

export default HeroSlider; 