import { useApolloClient } from '@apollo/client';
import { Box, Text } from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import ImageBackground from './ImageBackground';

const Navbar = (): JSX.Element => {
  const { loading: loadingMe, data } = useMeQuery({ skip: isServer() });
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  let body = null;

  if (loadingMe) {
    body = (
      <Box>
        <Button disabled colorScheme="blackAlpha">
          fetching
        </Button>
      </Box>
    );
  } else if (!data?.me) {
    body = (
      <Box>
        <Link to="/login">
          <Button colorScheme="blackAlpha" mr={4}>
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="blackAlpha">Register</Button>
        </Link>
      </Box>
    );
  } else {
    body = (
      <Flex alignItems="center">
        <Box mr={4} color="white">
          {data?.me?.username}
        </Box>
        <Button
          colorScheme="blackAlpha"
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <ImageBackground
      display="flex"
      p={4}
      position="sticky"
      top={0}
      zIndex={1}
      height="30vh"
      flexDir="column"
    >
      <Flex ml={'auto'} flexDir="row">
        {body}
      </Flex>
      <Flex justifyContent="center" mt="auto">
        <Text fontSize="6xl" color="white" mb={12}>
          <Link to="/home">Justin's Blog</Link>
        </Text>
      </Flex>
    </ImageBackground>
  );
};

export default Navbar;
