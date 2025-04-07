import React from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
    const phoneNumber = "9794741060"; 
    const message = "Hi, I'm interested in stem cell banking services."; // Default message
    
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <Zoom in={true}>
            <Fab
                color="primary"
                aria-label="whatsapp"
                onClick={handleClick}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    bgcolor: '#25D366', // WhatsApp green color
                    '&:hover': {
                        bgcolor: '#128C7E', // Darker shade for hover
                    },
                    zIndex: 1000,
                }}
            >
                <Tooltip title="Contact us on WhatsApp" placement="left">
                    <WhatsAppIcon sx={{ fontSize: 32 }} />
                </Tooltip>
            </Fab>
        </Zoom>
    );
};

export default WhatsAppButton; 