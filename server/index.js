const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// bodyParser 옵션 주기
// application/x-www-form-urlencoded 형태 자료 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형태 정보 분석
app.use(bodyParser.json());

app.use(cookieParser());


// mongoDB 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Conneted...')).catch(err => console.log(err));



app.get('/', (req, res) => res.send('hello~~'))

app.get('/api/hello', (req, res) => { res.send('Hello World!') })

// register 라우터
app.post('/api/users/register', (req, res) => {

  // 회원 가입시 필요한 정보를 client에서 가져오면
  // 정보를 db에 넣어준다.
  // save() -> mongoo db 메서드
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })

})

// Login 라우터
app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 db에 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })


      // 비밀번호까지 맞을 경우, 토큰 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 (쿠키, 로컬스토리지, 세션 ...)에 저장
        // 여기선 "x_auth"라는 이름의 쿠키에 저장한다.
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })


      })
    })
  })
})

// Authentication 라우터
// auth --> 미들웨어이다.
//role 0 -> 일반유저, role not 0 -> 관리자
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 건 Authentication이 True라는 말이다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image

  })
})

// Logout 라우터
// DB의 저장 된 token 값을 "" 제거해주면, auth 미들웨어를 통해 토큰값이 다르게 되면서
// 자동적으로 로그인이 풀리게 되는 원리다.
app.get('/api/users/logout', auth, (req, res) => {
  // findOneAndUpdate() -> 몽고DB 메서드
  //  req.user._id -> 미들웨어에서 온 값
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})


const port = 5000;
app.listen(port, () => console.log(`Server on port ${port}!!`));
