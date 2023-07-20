import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from '@mui/material';
import { HOME_PAGE } from '@app/router';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@app/stores';
import { NavMenu, StyledLogo } from './components';

export const Header = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { pages } = useAppSelector(state => state.apps);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledLogo to={HOME_PAGE}>PATTERNS</StyledLogo>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavMenu
              open={Boolean(anchorElNav)}
              anchor={anchorElNav}
              handleClose={handleCloseNavMenu}
            />
          </Box>
          <StyledLogo isMobile to={HOME_PAGE}>
            PATTERNS
          </StyledLogo>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map(page => (
              <Button
                component={NavLink}
                to={page.url}
                key={page.url}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
