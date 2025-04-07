import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Products from '../components/Products';
import VideoSection from '../components/VideoSection';
import StemCellInfo from '../components/StemCellInfo';
import Testimonials from '../components/Testimonials';
import { Box } from '@mui/material';

const Dashboard = () => {
    return (
        <Box>
            <HeroSlider />
            <Products />
            <VideoSection />
            <StemCellInfo />
            <Testimonials />
        </Box>
    );
};

export default Dashboard; 