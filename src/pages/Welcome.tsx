import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageBackground from '../components/ImageBackground';
import { fetchImage } from '../utils/fetchImage';

const Welcome = (): JSX.Element => {
  let image = window.localStorage.getItem('image');
  console.log('imageUrl: ' + image);

  useEffect(() => {
    (async () => {
      if (!image) {
        await fetchImage();
        console.log('running');
      }
    })();
  }, [image]);

  return (
    <ImageBackground
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      image={image ? image : ''}
    >
      <Text fontSize="100px" color="white" mb={12}>
        Justin's Blog
      </Text>
      <Link to="/home">
        <Button>Enter</Button>
      </Link>
    </ImageBackground>
  );
};

export default Welcome;
