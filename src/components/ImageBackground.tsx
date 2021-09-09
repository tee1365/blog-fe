import { Box, BoxProps } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface ImageBackgroundProps extends BoxProps {
  image: string;
  children: ReactNode;
}

const ImageBackground = ({
  image,
  children,
  height = '100vh',
  ...boxProps
}: ImageBackgroundProps): JSX.Element => {
  // let image: string | undefined;
  // image = cookies.splashPageImage;
  // console.log('imageUrl: ' + image);
  // useEffect(() => {
  //   (async () => {
  //     if (!image) {
  //       await fetchImage();
  //       console.log('running');
  //     }
  //   })();
  // }, [image, fetchImage]);
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { image } = nookies.get(ctx);
//   console.log(image);
//   if (!image) {
//     const imageObj: any = await Axios.get(
//       'https://api.unsplash.com/photos/random?orientation=landscape&client_id=zcZKjKq4URKIvy2gho5nO1Egrh5zEac5f4K3vpLL41s'
//     );
//     const image: string = imageObj.data.urls.regular;
//     nookies.set(ctx, 'image', image, {
//       maxAge: 60 * 60 * 24,
//     });
//   }

//   return { props: { image } };
// };

export default ImageBackground;
