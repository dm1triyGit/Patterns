import { MenuItem, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledLogo = styled(NavLink, {
  shouldForwardProp: prop => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ theme, isMobile }) => ({
  marginRight: theme.spacing(2),
  fontSize: isMobile ? 18 : 20,
  display: isMobile ? 'flex' : 'none',
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',

  [theme.breakpoints.up('md')]: {
    display: isMobile ? 'none' : 'flex',
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  a: {
    textDecoration: 'none',
    color: theme.palette.text.primary,

    '&.active': {
      opacity: '0.5',
      pointerEvent: 'none',
    },
  },
}));
