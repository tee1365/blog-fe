import { AddIcon } from '@chakra-ui/icons';
import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';
import Navbar from './Navbar';
import Wrapper, { WrapperVariant } from './Wrapper';

interface LayoutProps extends BoxProps {
  add?: boolean;
  variant?: WrapperVariant;
  children: ReactNode;
}

// this component set the basic layout of the application.

const Layout = ({
  children,
  variant = 'regular',
  add = false,
}: LayoutProps): JSX.Element => {
  const { data } = useMeQuery();
  const isAdmin = data?.me?.isAdmin;
  return (
    <>
      <Navbar></Navbar>
      <Wrapper variant={variant}>{children}</Wrapper>
      {add && isAdmin ? (
        <Box position="fixed" right="10vh" bottom="10vh">
          <Link to="/createPost">
            <IconButton
              aria-label="add-post"
              isRound={true}
              icon={<AddIcon />}
              size="lg"
              colorScheme="blackAlpha"
            ></IconButton>
          </Link>
        </Box>
      ) : null}
    </>
  );
};

export default Layout;
