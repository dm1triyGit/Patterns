import { Snackbar, styled } from '@mui/material';

export const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    right: theme.spacing(3),
  },

  [theme.breakpoints.up('lmd')]: {
    right: 'auto',
    maxWidth: 400,

    '.MuiPaper-root': {
      width: '100%',
      maxWidth: 'none',
    },
  },
}));
