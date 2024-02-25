import axios from 'axios';

const fetchImageNameWithQuery = (imageName, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=24433477-a7717dfa51cf01b03daed8616&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    )
    .then(response => response.data);
};

const api = { fetchImageNameWithQuery };

export default api;
