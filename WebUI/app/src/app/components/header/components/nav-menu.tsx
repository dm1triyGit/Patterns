import { useAppSelector } from '@app/stores';
import { Menu } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { StyledMenuItem } from './styled-elements';
import { MENU_SETTINGS } from '../assets';

interface Props {
  open: boolean;
  anchor: HTMLElement | null;
  handleClose: () => void;
}

export const NavMenu = ({ open, anchor, handleClose }: Props): JSX.Element => {
  const { pages } = useAppSelector(state => state.apps);

  return (
    <Menu
      anchorEl={anchor}
      onClose={handleClose}
      open={open}
      {...MENU_SETTINGS}
    >
      {pages.map(page => (
        <StyledMenuItem key={page.url} onClick={handleClose}>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={page.url}
          >
            {page.name}
          </NavLink>
        </StyledMenuItem>
      ))}
    </Menu>
  );
};
