import callAPI from '../config/api';
import { LoginTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function setSignUp(data: FormData) {
  const url = `http://localhost:4000/api/merchant/sign-up`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogin(data: LoginTypes) {
  const url = `http://localhost:4000/api/merchant/sign-in`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}
