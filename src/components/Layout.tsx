import { Box, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Wrapper, { WrapperVariant } from './Wrapper';

interface LayoutProps {
  add?: boolean;
  variant?: WrapperVariant;
  children: ReactNode;
}

const Layout = ({
  children,
  variant = 'regular',
  add = false,
}: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar></Navbar>
      <Wrapper variant={variant}>{children}</Wrapper>
      {add ? (
        <Box position="fixed" right="10vh" bottom="10vh">
          <Link to="/createPost">
            <Button>add</Button>
          </Link>
        </Box>
      ) : null}
    </>
  );
};

export default Layout;
