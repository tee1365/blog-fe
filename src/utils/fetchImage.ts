import axios from 'axios';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

// this function is used to fetch new image. It fetches an image from unsplash 
// and then store the url into localstroage. In addition, it also stores today's date into localstroage.

export const fetchImage = async () => {
  try {
    const imageObj: any = await axios.get(
      'https://api.unsplash.com/photos/random?orientation=landscape&client_id=zcZKjKq4URKIvy2gho5nO1Egrh5zEac5f4K3vpLL41s'
    );
    console.log(imageObj);
    const image: string = imageObj.data.urls.full;
    window.localStorage.setItem('image', image);
    dayjs.extend(dayOfYear);
    const day = dayjs().dayOfYear().toString();
    window.localStorage.setItem('imageDay', day);
    return image;
  } catch (e) {
    console.log(e);
  }
};
