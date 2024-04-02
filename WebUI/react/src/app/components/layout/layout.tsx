import { Box, Container } from '@mui/material';
import { Header } from '../header/header';

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ pb: 14 }}>
        <Container>{children}</Container>
      </Box>
    </>
  );
};
