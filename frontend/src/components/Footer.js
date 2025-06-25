import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ py: 3, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
            <Typography variant="body1">
                © 2025 Stem Cell Banking. All rights reserved.
            </Typography>
            <Typography variant="body2">
                Dummy data for footer content.
            </Typography>
        </Box>
    );
};

export default Footer;
