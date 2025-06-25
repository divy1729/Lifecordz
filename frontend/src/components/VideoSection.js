import React from 'react';
import { Box, Container } from '@mui/material';
import { GradientHeading } from './StyledHeadings';

const VideoSection = () => {
    return (
        <Box sx={{ 
            py: 8, 
            backgroundColor: theme => theme.palette.mode === 'dark' ? 'background.paper' : '#f5f5f5'
        }}>
            <Container maxWidth="lg">
                <GradientHeading variant="h3" align="center">
                    Learn About Stem Cell Therapy
                </GradientHeading>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 4,
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                    backgroundColor: theme => theme.palette.mode === 'dark' ? 'background.default' : 'white',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <iframe 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                        src="https://www.youtube.com/embed/xdEQfj2joJY?si=0SDnhhHdFnUZhRRA&start=10" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default VideoSection; 