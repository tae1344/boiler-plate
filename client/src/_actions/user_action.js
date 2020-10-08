import axios from 'axios';
import {
  LOGIN_USER
} from './types';

export function loginUser(dataToSumit) {
  // request를 리덕스에 넘겨주는 작업
  const request = axios.post('/api/users/login', dataToSumit)
    .then(response => response.data)


  return {
    type: LOGIN_USER,
    payload: request
  }
}