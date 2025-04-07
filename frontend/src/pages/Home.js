import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Products from '../components/Products';
import VideoSection from '../components/VideoSection';
import StemCellInfo from '../components/StemCellInfo';
import Testimonials from '../components/Testimonials';
import WhatsAppButton from '../components/WhatsAppButton';
import { Box } from '@mui/material';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <><Box>
            <HeroSlider />
            <Products />
            <VideoSection />
            <StemCellInfo />
            <Testimonials />
            <WhatsAppButton />
        </Box><Footer /></>
    );
};

export default Home; 