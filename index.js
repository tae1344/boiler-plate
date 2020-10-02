
const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');

// bodyParser 옵션 주기
// application/x-www-form-urlencoded 형태 자료 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형태 정보 분석
app.use(bodyParser.json());

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



app.listen(port, () => console.log(`Server on port ${port}!!`));