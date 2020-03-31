import axios from 'axios';
import * as api from '../lib/api';

jest.mock('axios');

test('calls API endpoint', () => {
  axios.request.mockResolvedValue({ foo: 123 });

  return api.request({ method: 'get', path: '/foo' }).then((res) => {
    expect(res).toEqual({ foo: 123 });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      url: `${api.BASE_API_URL}/foo`,
      headers: {
        Authorization: `Bearer ${api.authToken}`,
      },
    });
  });
});

test('redirects to signing page on 401 http responses', () => {
  axios.request.mockImplementation(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      response: {
        title: 'Unauthorized',
        status: 401,
        path: '/api/dashboard/studies',
        message: 'error.http.401',
      },
    });
  });

  return api.request({ method: 'get', path: '/foo' }).catch((res) => {
    expect(res).toEqual({
      response: {
        title: 'Unauthorized',
        status: 401,
        path: '/api/dashboard/studies',
        message: 'error.http.401',
      },
    });
    // TODO assert redirect window.location.pathname change (not supported by JSdom)
  });
});

test('can GET data from API endpoint', () => {
  axios.request.mockResolvedValue({ foo: 125 });
  return api.get('/bar').then((res) => {
    expect(res).toEqual({ foo: 125 });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      url: `${api.BASE_API_URL}/foo`,
      headers: {
        Authorization: `Bearer ${api.authToken}`,
      },
    });
  });
});

test('can POST data from API endpoint', () => {
  axios.request.mockResolvedValue({ foo: 125 });
  return api.post('/bar', { some: 'data' }).then((res) => {
    expect(res).toEqual({ foo: 125 });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'post',
      url: `${api.BASE_API_URL}/bar`,
      data: { some: 'data' },
      headers: {
        Authorization: `Bearer ${api.authToken}`,
      },
    });
  });
});

test('can PUT data from API endpoint', () => {
  axios.request.mockResolvedValue({ foo: 125 });
  return api.put('/baz', { baz: 123 }).then((res) => {
    expect(res).toEqual({ foo: 125 });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'put',
      url: `${api.BASE_API_URL}/baz`,
      headers: {
        Authorization: `Bearer ${api.authToken}`,
      },
      data: { baz: 123 },
    });
  });
});

test('can DELETE data from API endpoint', () => {
  axios.request.mockResolvedValue({ foo: 125 });
  return api.del('/del').then((res) => {
    expect(res).toEqual({ foo: 125 });
    expect(axios.request).toHaveBeenCalledWith({
      method: 'delete',
      url: `${api.BASE_API_URL}/del`,
      headers: {
        Authorization: `Bearer ${api.authToken}`,
      },
    });
  });
});

// test('removes token when gets a 401', () => {
//   api.get('/foo').then(() => {
//     expect(localStorage.getItem('token')).to.equal('');
//   });
// });
