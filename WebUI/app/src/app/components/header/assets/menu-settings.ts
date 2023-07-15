import { MenuProps } from '@mui/material';

export const MENU_SETTINGS: Partial<MenuProps> = {
  id: 'nav-menu',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  keepMounted: true,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  sx: {
    display: { xs: 'block', md: 'none' },
  },
};
