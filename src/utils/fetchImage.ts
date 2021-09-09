import Axios from 'axios';
import nookies from 'nookies';
import { getServerSideProps } from '../components/ImageBackground';

export const fetchImage = async (
  ctx: Parameters<typeof getServerSideProps>[0]
) => {
  try {
    const imageObj: any = await Axios.get(
      'https://api.unsplash.com/photos/random?orientation=landscape&client_id=zcZKjKq4URKIvy2gho5nO1Egrh5zEac5f4K3vpLL41s'
    );
    const image: string = imageObj.data.urls.regular;
    nookies.set(ctx, 'image', image, {
      maxAge: 60 * 60 * 24,
    });
    return image;
  } catch (e) {
    console.log(e);
  }
};
