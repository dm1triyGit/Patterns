import { useAppSelector } from '@app/stores';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AirplayIcon from '@mui/icons-material/Airplay';
import { NavLink } from 'react-router-dom';

const iconMapper = (str: string | undefined): JSX.Element => {
  switch (str) {
    case 'ListAlt':
      return <ListAltIcon />;
    default:
      return <AirplayIcon />;
  }
};

export const HomePage = (): JSX.Element => {
  const { pages } = useAppSelector(state => state.apps);

  return (
    <Box sx={{ pt: 4 }}>
      <Typography variant="h3" component="h1" textAlign="center" sx={{ mb: 4 }}>
        Patterns Apps
      </Typography>
      <List sx={{ border: '1px solid', borderColor: 'text.disabled' }}>
        {pages.map(({ url, name, icon, description }) => (
          <ListItem key={url}>
            <ListItemIcon>{iconMapper(icon)}</ListItemIcon>
            <ListItemText>
              <NavLink to={url}>{name}</NavLink>
            </ListItemText>
            {description && <ListItemText>{description}</ListItemText>}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
