import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Drawer,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AddressDialog = ({ open, onClose, onSubmit }) => {
    const { user, getToken } = useAuth();
    const [addressInfo, setAddressInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        pincode: '',
        country: 'India',
        state: '',
        city: '',
    });

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddressInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

    const saveAddress = async () => {
        try {
            if (!user) {
                onClose();
                // Optionally redirect to login or show message
                return;
            }
            // Retrieve token from context
            const token = getToken();
            await axios.put(`${API_BASE}/users/${user.id}/address`, addressInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onSubmit(addressInfo);
            onClose();
        } catch (error) {
            console.error('Failed to save address:', error);
        }
    };
    

    const isFormValid = () => {
        return addressInfo.firstName &&
            addressInfo.lastName &&
            addressInfo.address &&
            addressInfo.pincode &&
            addressInfo.state &&
            addressInfo.city;
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 400 } }
            }}
        >
            <Box sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <DialogTitle sx={{ p: 0 }}>Please Add Your New Address</DialogTitle>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="firstName"
                            label="First Name*"
                            value={addressInfo.firstName}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            name="lastName"
                            label="Last Name*"
                            value={addressInfo.lastName}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            name="address"
                            label="Address*"
                            value={addressInfo.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <TextField
                            name="pincode"
                            label="Pincode*"
                            value={addressInfo.pincode}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            name="country"
                            label="Country"
                            value={addressInfo.country}
                            disabled
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>State*</InputLabel>
                            <Select
                                name="state"
                                value={addressInfo.state}
                                onChange={handleChange}
                                label="State*"
                            >
                                {states.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="city"
                            label="City*"
                            value={addressInfo.city}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ mt: 3 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={saveAddress}
                        disabled={!isFormValid()}
                    >
                        Proceed to Checkout
                    </Button>
                </DialogActions>
            </Box>
        </Drawer>
    );
};

export default AddressDialog;
