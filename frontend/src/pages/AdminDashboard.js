import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Box, Paper, CircularProgress, Alert,
    Button, TextField, MenuItem, Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [plans, setPlans] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { getToken } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = getToken();
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [usersResponse, ordersResponse, plansResponse, analyticsResponse] = await Promise.all([
                    axios.get('/api/users', config),
                    axios.get('/api/orders', config),
                    axios.get('/api/plans', config),
                    axios.get('/api/analytics', config),
                ]);

                setUsers(usersResponse.data);
                setOrders(ordersResponse.data);
                setPlans(plansResponse.data);
                setAnalytics(analyticsResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/api/users/${userId}/role`, { role: newRole });
            setUsers((prev) =>
                prev.map((user) => user.id === userId ? { ...user, role: newRole } : user)
            );
        } catch {
            alert('Failed to update role');
        }
    };

    const handleAddPlan = async (newPlan) => {
        try {
            const token = getToken();
            const response = await axios.post('/api/plans', newPlan, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPlans((prev) => [...prev, response.data]);
        } catch {
            alert('Failed to add plan');
        }
    };

    const userColumns = [
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 100,
            renderCell: (params) => (
                <Avatar src={params.row.avatar || '/p2.png'} alt="Avatar" />
            )
        },
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
                    renderCell: (params) => (
                        <TextField
                            select
                            value={params.value}
                            onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
                            size="small"
                        >
                            <MenuItem value="DONOR">Donor</MenuItem>
                            <MenuItem value="DOCTOR">Doctor</MenuItem>
                            <MenuItem value="TECHNICIAN">Technician</MenuItem>
                        </TextField>
                    )
        }
    ];

    const orderColumns = [
        { field: 'id', headerName: 'Order ID', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'date',
            headerName: 'Date',
            width: 180,
            valueFormatter: (params) => {
                if (!params || !params.value) return "";
                const date = new Date(params.value);
                return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            }
        },
        { field: 'userName', headerName: 'User Name', width: 200 },
        { field: 'userEmail', headerName: 'User Email', width: 250 },
        {
            field: 'address',
            headerName: 'Address',
            width: 300,
            valueFormatter: (params) => {
                if (!params || !params.value) return "";
                return JSON.stringify(params.value, null, 2);
            }
        },
        {
            field: 'birthInfo',
            headerName: 'Birth Info',
            width: 300,
            valueFormatter: (params) => {
                if (!params || !params.value) return "";
                return JSON.stringify(params.value, null, 2);
            }
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Manage Users
                        </Typography>
                        <Paper sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={users}
                                columns={userColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                                getRowId={(row) => row.id}
                            />
                        </Paper>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            View Orders
                        </Typography>
                        <Paper sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={orders}
                                columns={orderColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                                getRowId={(row) => row.id}
                            />
                        </Paper>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Manage Plans
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => handleAddPlan({ name: 'New Plan', price: 100 })}
                        >
                            Add Plan
                        </Button>
                        <Paper sx={{ height: 400, width: '100%', mt: 2 }}>
                            <DataGrid
                                rows={plans}
                                columns={[
                                    { field: 'name', headerName: 'Plan Name', width: 200 },
                                    { field: 'price', headerName: 'Price', width: 150 }
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                                getRowId={(row) => row.id}
                            />
                        </Paper>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            System Analytics
                        </Typography>
                        <Paper sx={{ p: 2 }}>
                            <Typography>Total Users: {analytics?.totalUsers || 0}</Typography>
                            <Typography>Total Orders: {analytics?.totalOrders || 0}</Typography>
                            <Typography>Total Revenue: ${analytics?.totalRevenue || 0}</Typography>
                        </Paper>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default AdminDashboard;
