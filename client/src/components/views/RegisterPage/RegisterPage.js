import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  // 리액트 state 생성
  const [Email, setEmail] = useState("") // 처음에 빈 스트링으로 설정
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 기본 이벤트 막음(submit시 리프레시 되는 이벤트)

    if (Password !== ConfirmPassword) {
      return alert('비밀번호가 다릅니다!')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    // 리덕스를 사용해 서버에 보내기 위한 액션, 만약 리덕스 안쓴다면 axios를 이용했어야 한다.
    dispatch(registerUser(body)) //registerUser 액션을 취한다.
      .then(response => {
        if (response.payload.success) {
          props.history.push("/login")
        } else {
          alert("Failed to sign up!")
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
