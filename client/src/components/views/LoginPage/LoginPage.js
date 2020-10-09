import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  // 리액트 state 생성
  const [Email, setEmail] = useState("") // 처음에 빈 스트링으로 설정
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 기본 이벤트 막음(submit시 리프레시 되는 이벤트)

    let body = {
      email: Email,
      password: Password
    }

    // 리덕스를 사용해 서버에 보내기 위한 액션
    dispatch(loginUser(body)) //loginUser라는 액션을 취한다.
      .then(response => {
        // 로그인 성공하면 랜딩페이지로 넘어감
        if (response.payload.loginSuccess) {
          props.history.push('/') //리액트에서 페이지 넘기는 방법
        } else {
          alert('Error~')
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage)
