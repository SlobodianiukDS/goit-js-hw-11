const KEY_PIXABAY = `31780864-020c8df7e4046209d9735e02d`;
const basaURL = `https://pixabay.com/api/`;
export const limit = 40;

import axios from 'axios';
import { page } from './createGallery';

export function fetchImages(name) {
  return axios
    .get(
      `${basaURL}?key=${KEY_PIXABAY}&q=${name}&per_page=${limit}&page=${page}`
    )
    .then(r => {
      // console.log(r.data);
      return r.data;
    });
}
