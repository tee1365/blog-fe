import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import ImageBackground from '../components/ImageBackground';

const Welcome = (): JSX.Element => {
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
      <Link to="/home">
        <Button size="lg">Enter</Button>
      </Link>
    </ImageBackground>
  );
};

export default Welcome;
