import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER
} from './types';

// 로그인 액션
export function loginUser(dataToSumit) {
  // request를 리덕스에 넘겨주는 작업
  const request = axios.post('/api/users/login', dataToSumit)
    .then(response => response.data)


  return {
    type: LOGIN_USER,
    payload: request
  }
}

// 회원가입 액션
export function registerUser(dataToSumit) {
  // request를 리덕스에 넘겨주는 작업
  const request = axios.post('/api/users/register', dataToSumit)
    .then(response => response.data)


  return {
    type: REGISTER_USER,
    payload: request
  }
}