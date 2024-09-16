// Api - Common
import axios from 'axios';
import store from '../state';

const apiUrl = 'https://demo.drcarrot.in/api';

function getToken() {
  const { auth } = store.getState();

  return (auth && auth.accessToken) || '';
}

export async function apiLoginPost(url, data) {
  try {
    const resp = await axios.post(`${apiUrl}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (resp && resp.data) || null;
  } catch (err) {
    throw new Error(`Api Post Error: ${err.message}`);
  }
}

export async function apiPost(url, data = {}) {
  try {
    const resp = await axios.post(`${apiUrl}${url}`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return (resp && resp.data) || null;
  } catch (err) {
    throw new Error(`Api Post Error: ${err.message}`);
  }
}

export async function apiGet(url) {
  try {
    const resp = await axios.get(`${apiUrl}${url}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return (resp && resp.data) || null;
  } catch (err) {
    throw new Error(`Api Post Error: ${err.message}`);
  }
}

// export async function apiGetWithParams(url, params = {}) {
//   try {
//     const resp = await axios.get(`${apiUrl}${url}`, {
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });

//     return (resp && resp.data) || null;
//   } catch (err) {
//     throw new Error(`Api Post Error: ${err.message}`);
//   }
// }
