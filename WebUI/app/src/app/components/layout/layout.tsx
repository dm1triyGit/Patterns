import { Container } from '@mui/material';
import { Header } from '../';

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};
