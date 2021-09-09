import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import ImageBackground from '../components/ImageBackground';

const index = (): JSX.Element => {
  return (
    <ImageBackground
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="100px" color="white" mb={12}>
        Justin's Blog
      </Text>
      <Route href="/home">
        <Button>Enter</Button>
      </Route>
    </ImageBackground>
  );
};

export default index;
