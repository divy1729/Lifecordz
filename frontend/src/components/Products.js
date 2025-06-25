import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import { GradientHeading, SectionHeading } from './StyledHeadings';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    borderRadius: '16px',
    maxWidth: '340px',
    margin: '0 auto',
    '&:hover': {
        transform: 'translateY(-10px)',
    },
}));

const Products = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const plans = [
        {
            id: 1,
            title: "1 Year Plan",
            price: "₹45,000",
            features: [
                "1 Year Storage",
                "Basic Processing",
                "24/7 Support",
                "Standard Collection Kit"
            ],
            description: "Perfect for short-term storage needs"
        },
        {
            id: 2,
            title: "21 Years Plan",
            price: "₹70,000",
            features: [
                "21 Years Storage",
                "Advanced Processing",
                "Priority Support",
                "Premium Collection Kit",
                "Insurance Coverage"
            ],
            description: "Most popular choice for families"
        },
        {
            id: 3,
            title: "75 Years Plan",
            price: "₹1,50,000",
            features: [
                "75 Years Storage",
                "Premium Processing",
                "VIP Support",
                "Elite Collection Kit",
                "Extended Insurance Coverage",
                "Lifetime Warranty"
            ],
            description: "Ultimate protection for generations"
        }
    ];

    const handleViewDetails = (planId) => {
        navigate(`/plan/${planId}`);
    };

    const handleAddToCart = (plan) => {
        addToCart({
            id: plan.id,
            title: plan.title,
            price: plan.price,
        });
    };

    return (
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
            <Container maxWidth="lg">
                <GradientHeading variant="h3" align="center">
                    Our Plans
                </GradientHeading>
                <SectionHeading variant="h6" align="center" color="textSecondary">
                    Choose the perfect plan for your family's future
                </SectionHeading>
                <Grid container spacing={4} sx={{ mt: 3, justifyContent: 'center' }}>
                    {plans.map((plan) => (
                        <Grid item key={plan.id} xs={12} sm={6} md={4} lg={4}>
                            <StyledCard>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        {plan.title}
                                    </Typography>
                                    <Typography variant="h3" color="primary" gutterBottom>
                                        {plan.price}
                                    </Typography>
                                    {plan.features.map((feature, idx) => (
                                        <Typography key={idx} paragraph>
                                            • {feature}
                                        </Typography>
                                    ))}
                                </CardContent>
                                <CardActions sx={{ p: 2, gap: 1 }}>
                                    <Button 
                                        fullWidth 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => handleViewDetails(plan.id)}
                                    >
                                        View Details
                                    </Button>
                                    <Button 
                                        fullWidth 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => handleAddToCart(plan)}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Products; 