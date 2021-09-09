import { Box, Text } from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import ImageBackground from './ImageBackground';

const Navbar = (): JSX.Element => {
  // cookie can only be fetched at browser
  const [{ fetching, data }] = useMeQuery({ pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
    body = (
      <Box>
        <Button disabled>fetching</Button>
      </Box>
    );
  } else if (!data?.me) {
    body = (
      <>
        <Link to="/login">
          <Button mr={4}>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data?.me?.username}</Box>
        <Button
          variant="link"
          onClick={() => logout()}
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
      image=""
    >
      <Flex ml={'auto'} flexDir="row">
        {body}
      </Flex>
      <Flex justifyContent="center" mt="auto">
        <Text fontSize="6xl" color="white" mb={12}>
          Justin's Blog
        </Text>
      </Flex>
    </ImageBackground>
  );
};

export default Navbar;
