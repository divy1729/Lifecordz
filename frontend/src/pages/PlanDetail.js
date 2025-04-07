import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { GradientHeading, SectionHeading } from '../components/StyledHeadings';

const PlanDetail = () => {
    const { planId } = useParams();
    const { addToCart } = useCart();

    // This would typically come from an API or database
    const plans = {
        1: {
            id: 1,
            title: "1 Year Plan",
            price: "₹75,000",
            description: "Detailed description will go here...",
        },
        2: {
            id: 2,
            title: "21 Years Plan",
            price: "₹1,50,000",
            description: "Detailed description will go here...",
        },
        3: {
            id: 3,
            title: "75 Years Plan",
            price: "₹3,50,000",
            description: "Detailed description will go here...",
        }
    };

    const plan = plans[planId];

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <GradientHeading variant="h2" gutterBottom>
                    {plan.title}
                </GradientHeading>
                <SectionHeading variant="h4" color="primary" gutterBottom>
                    {plan.price}
                </SectionHeading>
                <Typography variant="body1" paragraph>
                    {plan.description}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => addToCart(plan)}
                >
                    Add to Cart
                </Button>
            </Box>
        </Container>
    );
};

export default PlanDetail; 