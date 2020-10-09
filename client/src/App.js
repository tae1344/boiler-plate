import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'; // HOC
//옵션
// null -> 아무나 출입이 가능한 페이지
// true -> 로그인한 유저만 출입이 가능한 페이지
// false -> 로그인한 유저는 출입이 불가능한 페이지

function App() {
  return (
    <Router>
      <div>

        <Switch>

          <Route exact path="/" component={Auth(LandingPage, null)} />

          <Route exact path="/login" component={Auth(LoginPage, false)} />

          <Route exact path="/register" component={Auth(RegisterPage, false)} />


        </Switch>

      </div>
    </Router>
  );
}

export default App;
