import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
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

// 인증 체크 
// get이라 body부분 필요 없음
export function auth() {
  // request를 리덕스에 넘겨주는 작업
  const request = axios.get('/api/users/auth')
    .then(response => response.data)


  return {
    type: AUTH_USER,
    payload: request
  }
}