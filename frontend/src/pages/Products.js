import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Basic Plan',
      description: 'Essential stem cell storage solution',
      price: '$1999'
    },
    {
      id: 2,
      name: 'Premium Plan',
      description: 'Advanced stem cell preservation package',
      price: '$2999'
    },
    {
      id: 3,
      name: 'Lifetime Plan',
      description: 'Comprehensive lifetime storage solution',
      price: '$4999'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="h6">
                  {product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products; 