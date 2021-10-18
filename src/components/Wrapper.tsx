import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
  children: ReactNode;
}

// this component set the max width of non-header components.

const Wrapper = ({
  children,
  variant = 'regular',
}: WrapperProps): JSX.Element => {
  return (
    <Box maxW={variant === 'regular' ? '75%' : '45%'} w="100%" mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
