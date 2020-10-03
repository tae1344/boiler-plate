const { User } = require("../models/User");


let auth = (req, res, next) => {
  // 인증 처리 담당

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없다면 NO
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저가 있으면 인증 OK
    req.token = token;
    req.user = user;
    next(); // 호출된? 곳으로 req정보 넘어감
  })
}

module.exports = { auth };