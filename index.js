
const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
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


// register 라우터
app.post('/register', (req, res) => {

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
app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
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

app.listen(port, () => console.log(`Server on port ${port}!!`));