import { Box, BoxProps } from '@chakra-ui/layout';
import { ReactNode, useEffect } from 'react';
import { fetchImage } from '../utils/fetchImage';
import { isSameDay } from '../utils/isSameDay';

interface ImageBackgroundProps extends BoxProps {
  children: ReactNode;
}

const ImageBackground = ({
  children,
  height = '100vh',
  ...boxProps
}: ImageBackgroundProps): JSX.Element => {
  let image = window.localStorage.getItem('image') || '';

  useEffect(() => {
    (async () => {
      if (!image || !isSameDay()) {
        await fetchImage();
      }
    })();
  }, [image]);

  return (
    <Box backgroundImage={`url(${image})`} backgroundSize="cover">
      <Box
        width="100%"
        background="rgba(0, 0, 0, 0.4)"
        {...boxProps}
        height={height}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ImageBackground;
