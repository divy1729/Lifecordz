import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    IconButton,
    TextField,
    Grid,
    Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BirthInfoDialog from '../components/BirthInfoDialog';
import AddressDialog from '../components/AddressDialog';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [couponCode, setCouponCode] = React.useState('');
    const [openBirthInfo, setOpenBirthInfo] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        birthInfo: null,
        addressInfo: null
    });

    // Calculate totals
    const itemTotal = cartItems.reduce((total, item) => {
        const price = Number(item.price.replace(/[^0-9]/g, ''));
        return total + (price * item.quantity);
    }, 0);

    const collectionCharges = 4000;
    const tax = Math.round(itemTotal * 0.18);
    const grandTotal = itemTotal + collectionCharges + tax;

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity >= 1) {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleBirthInfoSubmit = (birthInfo) => {
        setOrderInfo(prev => ({ ...prev, birthInfo }));
        setOpenBirthInfo(false);
        setOpenAddress(true);
    };

    const handleAddressSubmit = (addressInfo) => {
        setOrderInfo(prev => ({ ...prev, addressInfo, amount: grandTotal }));
        navigate('/payment', { state: { orderInfo: { ...orderInfo, addressInfo, amount: grandTotal } } });
    };

    // Empty Cart View
    if (cartItems.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 3
                }}>
                    <ShoppingCartIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.7 }} />
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            background: 'linear-gradient(45deg, #2E3B55 30%, #3F51B5 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}
                    >
                        Your Cart is Empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Add items to your cart to proceed with the purchase
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="large"
                        onClick={() => navigate('/home')}
                        sx={{ mt: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, color: 'text.secondary' }}>
                <Typography color="primary">Cart</Typography>
                <Typography>{'>'}</Typography>
                <Typography>Address</Typography>
                <Typography>{'>'}</Typography>
                <Typography>Payment</Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography 
                        variant="h4" 
                        gutterBottom
                        sx={{ 
                            background: 'linear-gradient(45deg, #2E3B55 30%, #3F51B5 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            mb: 3
                        }}
                    >
                        Shopping Cart
                    </Typography>
                    
                    {cartItems.map((item) => (
                        <Paper key={item.id} sx={{ mb: 2, p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography color="text.secondary">
                                        {item.id}
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <IconButton 
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        size="small"
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{item.quantity}</Typography>
                                    <IconButton 
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        size="small"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>

                                <IconButton 
                                    onClick={() => removeFromCart(item.id)}
                                    color="error"
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}
                </Grid>

                <Grid item xs={12} md={4}>
                    {/* Coupon Section */}
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Typography 
                            variant="h6" 
                            gutterBottom
                            sx={{ 
                                color: '#2E3B55',
                                fontWeight: 'bold'
                            }}
                        >
                            Use Coupon Code
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Coupon Code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <Button variant="contained" color="primary">
                                Apply
                            </Button>
                        </Box>
                    </Paper>

                    {/* Pricing Details */}
                    <Paper sx={{ p: 2 }}>
                        <Typography 
                            variant="h6" 
                            gutterBottom
                            sx={{ 
                                color: '#2E3B55',
                                fontWeight: 'bold'
                            }}
                        >
                            Pricing Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Item Total</Typography>
                                <Typography>₹{itemTotal}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Item Discount</Typography>
                                <Typography>₹0</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Collection Charges</Typography>
                                <Typography>₹{collectionCharges}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Coupon Discount</Typography>
                                <Typography>₹0</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Store Credit</Typography>
                                <Typography>₹0</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Shipping</Typography>
                                <Typography>₹0</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Tax</Typography>
                                <Typography>₹{tax}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6">Grand Total</Typography>
                                <Typography variant="h6">₹{grandTotal}</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ 
                            mt: 3,
                            background: 'linear-gradient(45deg, #2E3B55 30%, #3F51B5 90%)',
                            boxShadow: '0 3px 5px 2px rgba(46, 59, 85, .3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #3F51B5 30%, #2E3B55 90%)',
                            }
                        }}
                        onClick={() => setOpenBirthInfo(true)}
                    >
                        Add Birth Info
                    </Button>
                </Grid>
            </Grid>

            <BirthInfoDialog
                open={openBirthInfo}
                onClose={() => setOpenBirthInfo(false)}
                onSubmit={handleBirthInfoSubmit}
            />

            <AddressDialog
                open={openAddress}
                onClose={() => setOpenAddress(false)}
                onSubmit={handleAddressSubmit}
            />
        </Container>
    );
};

export default Cart;