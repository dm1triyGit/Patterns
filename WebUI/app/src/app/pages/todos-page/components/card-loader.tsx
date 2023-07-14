import { alpha, styled } from '@mui/material';

export const CardLoader = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  background: alpha(theme.palette.background.paper, 0.8),
}));
