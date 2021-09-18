import { useApolloClient } from '@apollo/client';
import { Box, Text } from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import ImageBackground from './ImageBackground';

const Navbar = (): JSX.Element => {
  const history = useHistory();

  const { loading: loadingMe, data } = useMeQuery({ skip: isServer() });
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  let body = null;

  if (loadingMe) {
    body = (
      <Box>
        <Button disabled>fetching</Button>
      </Box>
    );
  } else if (!data?.me) {
    body = (
      <Box>
        <Link to="/login">
          <Button mr={4}>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
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
          onClick={async () => {
            logout();
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
        <Text
          fontSize="6xl"
          color="white"
          mb={12}
          onClick={() => history.push('/home')}
        >
          Justin's Blog
        </Text>
      </Flex>
    </ImageBackground>
  );
};

export default Navbar;
