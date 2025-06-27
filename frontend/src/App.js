import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import PlanDetail from './pages/PlanDetail';
import { ThemeProvider } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import Cart from './pages/Cart';
import StemCellBanking from './pages/StemCellBanking';
import CordBlood from './pages/CordBlood';
import CordLining from './pages/CordLining';
import YourPlans from './pages/YourPlans';
import Payment from './pages/Payment';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import SupportDashboard from './pages/SupportDashboard';
import CourierDashboard from './pages/CourierDashboard';
import axios from 'axios';

const App = () => {
    useEffect(() => {
        const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");
        axios.get(`${API_BASE}/health`).catch(() => {});
    }, []);

    return (
        <ThemeProvider>
            <CssBaseline />
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            <Navbar />
                            {/* Add margin-top to account for fixed navbar */}
                            <Box sx={{ mt: '64px' }}>
                                <Routes>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/admin-dashboard" element={
                                        <ProtectedRoute requiredRole="ADMIN">
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/doctor-dashboard" element={
                                        <ProtectedRoute requiredRole="DOCTOR">
                                            <DoctorDashboard />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/technician-dashboard" element={
                                        <ProtectedRoute requiredRole="TECHNICIAN">
                                            <TechnicianDashboard />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/support-dashboard" element={
                                        <ProtectedRoute requiredRole="SUPPORT">
                                            <SupportDashboard />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/courier-dashboard" element={
                                        <ProtectedRoute requiredRole="COURIER">
                                            <CourierDashboard />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/" element={<Navigate to="/home" replace />} />
                                    <Route path="/plan/:planId" element={<PlanDetail />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/stem-cell-banking" element={<StemCellBanking />} />
                                    <Route path="/stem-cell-banking/cord-blood" element={<CordBlood />} />
                                    <Route path="/stem-cell-banking/cord-lining" element={<CordLining />} />
                                    <Route path="/your-plans" element={<YourPlans />} />
                                    <Route path="/payment" element={<Payment />} />
                                </Routes>
                            </Box>
                            <WhatsAppButton />
                        </Box>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
