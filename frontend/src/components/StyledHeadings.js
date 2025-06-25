import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GradientHeading = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2E3B55 30%, #3F51B5 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
}));

export const SectionHeading = styled(Typography)(({ theme }) => ({
    color: '#2E3B55',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
})); 