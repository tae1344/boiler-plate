import {
  LOGIN_USER
} from '../_actions/types';



export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload } // ... 스프레드 오퍼레이트 --> 똑같이 그대로 가져오는 기능
      break;

    default:
      return state;
  }
}