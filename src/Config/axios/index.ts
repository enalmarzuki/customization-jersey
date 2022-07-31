import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}`,
  headers: {
    Accept: 'application/json',
  },
});

console.log('process.env.REACT_APP_HOST', process.env.REACT_APP_HOST);

// API.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const { auth } = state;

//     if (auth.accessToken) {
//       config.headers.authorization = `Bearer ${auth.accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       store.dispatch({ type: GET_ACCESS_TOKEN, value: '' });
//       store.dispatch({ type: GET_DATA_USER, value: {} });

//       return (window.location.href = '/');
//     }
//     return Promise.reject(error);
//   }
// );

export default API;
