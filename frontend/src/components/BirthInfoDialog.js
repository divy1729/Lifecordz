import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/authService';

const BirthInfoDialog = ({ open, onClose, onSubmit }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { token } = useAuth(); // Retrieve token from AuthContext
    const [birthInfo, setBirthInfo] = useState({
        expectedDeliveryDate: '',
        deliveryCity: '',
        birthingHospital: '',
        doctor: '',
        consentToDonate: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hospitals = [
        "Goodwill Hospital And Maternity Home",
        "Apollo Hospital",
        "Fortis Hospital",
        "Max Hospital"
    ];

    const doctors = [
        "Dr. Dimple Sharma",
        "Dr. Rajesh Kumar",
        "Dr. Priya Singh",
        "Dr. Amit Patel"
    ];

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setBirthInfo(prev => ({
            ...prev,
            [name]: name === 'consentToDonate' ? checked : value
        }));
    };

    const saveBirthInfo = async () => {
        setLoading(true);
        setError('');
        try {
            if (!user) {
                onClose();
                navigate('/login', {
                    state: {
                        returnTo: '/cart',
                        birthInfo: birthInfo
                    }
                });
                return;
            }
            await axios.put(`/api/users/${user.id}/birth-info`, birthInfo, {
                headers: {
                  Authorization: `Bearer ${authService.getToken()}`, // Use token from context
                },
              });
            onSubmit(birthInfo);
        } catch (error) {
            console.error('Failed to save birth info:', error);
            setError('Failed to save birth info. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleSubmit = () => {
        saveBirthInfo();
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Birthing Information
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        name="expectedDeliveryDate"
                        label="Expected Delivery Date"
                        type="date"
                        value={birthInfo.expectedDeliveryDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />

                    <TextField
                        name="deliveryCity"
                        label="Delivery City"
                        value={birthInfo.deliveryCity}
                        onChange={handleChange}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Birthing Hospital</InputLabel>
                        <Select
                            name="birthingHospital"
                            value={birthInfo.birthingHospital}
                            onChange={handleChange}
                            label="Birthing Hospital"
                        >
                            {hospitals.map((hospital) => (
                                <MenuItem key={hospital} value={hospital}>
                                    {hospital}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Doctor</InputLabel>
                        <Select
                            name="doctor"
                            value={birthInfo.doctor}
                            onChange={handleChange}
                            label="Doctor"
                        >
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor} value={doctor}>
                                    {doctor}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="consentToDonate"
                                checked={birthInfo.consentToDonate}
                                onChange={handleChange}
                            />
                        }
                        label="Please provide consent to donate your baby's placenta to LifeCordz."
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    disabled={!birthInfo.expectedDeliveryDate || !birthInfo.deliveryCity || !birthInfo.birthingHospital || !birthInfo.doctor}
                >
                    Next
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BirthInfoDialog;
