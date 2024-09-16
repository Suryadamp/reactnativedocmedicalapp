// Api - Auth
import { apiLoginPost, apiPost } from './common';

export async function authLogin(email, password) {
  return apiLoginPost('/login', {
    mobile: email,
    password,
  });
}

export async function authLogout() {
  return apiPost('/logout');
}
