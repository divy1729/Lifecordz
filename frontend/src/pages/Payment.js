import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import { GradientHeading } from '../components/StyledHeadings';
import axios from 'axios';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const Payment = () => {
    const location = useLocation();
    const orderInfo = location.state?.orderInfo || { amount: 0, userId: '', email: '', phone: '' };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { token, user } = useAuth();

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const res = await loadRazorpayScript();
        if (!res) {
            setError('Failed to load Razorpay SDK. Please check your internet connection.');
            setLoading(false);
            return;
        }
        try {
            // Create order in backend with status pending
            const orderResponse = await axios.post(
                `${API_BASE}/orders`,
                {
                    userId: user.id, // Use logged-in user's id
                    amount: orderInfo?.amount,
                    status: 'pending',
                    paymentDetails: {}
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const createdOrder = orderResponse.data;
            // Create Razorpay order
            const razorpayOrderResponse = await axios.post(
                `${API_BASE}/payment/create-order`,
                {
                    amount: orderInfo?.amount * 100, // amount in paise
                    currency: 'INR',
                    receipt: createdOrder.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const razorpayOrderData = razorpayOrderResponse.data;
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: razorpayOrderData.amount,
                currency: razorpayOrderData.currency,
                name: 'StemCell Banking',
                description: 'Payment for Stem Cell Banking',
                order_id: razorpayOrderData.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(
                            `${API_BASE}/payment/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                            }
                        });
                        if (verifyRes.status === 200) {
                            // Update order status to paid
                            await axios.put(
                                `${API_BASE}/orders/${createdOrder.id}/status`,
                                {
                                    status: 'paid',
                                    paymentDetails: {
                                        razorpay_order_id: response.razorpay_order_id,
                                        razorpay_payment_id: response.razorpay_payment_id,
                                        razorpay_signature: response.razorpay_signature,
                                    }
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    }
                                }
                            );
                            setSuccess('Payment verified successfully!');
                        } else {
                            setError('Payment verification failed.');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        setError('Error verifying payment. Please contact support.');
                    }
                },
                prefill: {
                    email: orderInfo?.email || '',
                    contact: orderInfo?.phone || ''
                },
                theme: {
                    color: '#1976d2'
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error('Payment initiation error:', err);
            setError('Payment failed to initiate. Please try again.');
        }
        setLoading(false);
    };
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 8 }}>
                <GradientHeading variant="h2" gutterBottom>
                    Payment
                </GradientHeading>
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <Typography>Amount: ₹{orderInfo?.amount}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Payment Methods
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Pay Now'}
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Payment;
