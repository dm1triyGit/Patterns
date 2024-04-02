import { styled } from '@mui/material';

export const StyledSection = styled('section')(({ theme }) => ({
  ...theme.typography,
  paddingTop: theme.spacing(4),
}));
