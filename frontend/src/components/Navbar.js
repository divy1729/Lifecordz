import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    useScrollTrigger,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const pages = [
    { title: 'Home', path: '/home' },
    { title: 'Stem Cell Banking', path: '/stem-cell-banking' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' }
];

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { darkMode, toggleDarkMode } = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleCloseUserMenu();
    };

    const userMenuItems = [
        { title: 'Your Plans', path: '/your-plans' },
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Logout', action: handleLogout }
    ];

    return (
        <AppBar 
            position="fixed"
            sx={{
                backgroundColor: trigger ? 'white' : 'rgba(0, 0, 0, 0.8)',
                color: trigger ? 'primary.main' : 'white',
                transition: 'all 0.3s ease-in-out',
                backdropFilter: 'blur(8px)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo for larger screens */}
                    <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/home')}
                    >
                        LIFECORDZ
                    </Typography>

                    {/* Mobile menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={() => handleNavigate(page.path)}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo for mobile */}
                    <LocalHospitalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/home')}
                    >
                        LIFECORDZ
                    </Typography>

                    {/* Desktop menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => handleNavigate(page.path)}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    {/* User menu */}
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {user && (
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        color: trigger ? 'primary.main' : 'white',
                                        fontWeight: 'bold',
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    Hi, {user.firstName}!
                                </Typography>
                            )}
                            <IconButton 
                                color="inherit" 
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            <IconButton 
                                color="inherit" 
                                onClick={() => navigate('/cart')}
                            >
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={user.firstName} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <Box sx={{ px: 2, py: 1 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                Hi, {user.firstName}!
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        {userMenuItems.map((item) => (
                                            <MenuItem 
                                                key={item.title} 
                                                onClick={() => {
                                                    if (item.action) {
                                                        item.action();
                                                    } else {
                                                        handleNavigate(item.path);
                                                    }
                                                    handleCloseUserMenu();
                                                }}
                                            >
                                                <Typography textAlign="center">{item.title}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{ color: 'inherit' }}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar; 