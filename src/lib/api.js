import axios from 'axios';

export const BASE_API_URL = 'https://igive-2.herokuapp.com/api';
export const authToken = localStorage.getItem('token');

export function request({ path, method, data, responseType }) {
  return axios
    .request({
      method,
      data,
      responseType,
      url: BASE_API_URL + path,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .catch((error) => {
      const { response } = error;
      if (response && response.status === 401) {
        localStorage.setItem('token', '');
        window.location.pathname = '/signin';
      }
      throw error;
    });
}

export const get = (path, opts) => request({ path, method: 'get', ...opts });
export const post = (path, data, opts) => request({ path, data, method: 'post', ...opts });
export const put = (path, data, opts) => request({ path, data, method: 'put', ...opts });
export const del = (path, opts) => request({ path, method: 'delete', ...opts });
