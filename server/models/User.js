// DB 스키마, 모델
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //공백을 제거해주는 역할
    unique: 1 // 중복 방지
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// mongoose에 저장 하기 전에 무엇인가 하도록 하는 메서드
userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    // 비밀번호 암호화 시키기
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)

        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
});


userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword : 1234 랑 암호화된 비번 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })

}

userSchema.methods.generateToken = function (cb) {
  let user = this;
  //jsonwebtoken 으로 토큰 생성하기
  // 여기서 _id는 db에 저장된 id 값
  // user._id + 'secretToken' = token
  // user._id.toHexString() --> plain object 자료형으로 바꿔줌?
  let token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token;
  // DB 자료에 생성한 token값을 저장해준다.
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user)
  })

}

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  // 토큰을 decode 한다.
  jwt.verify(token, 'secretToken', function (err, decoded) {
    // 유저 아이디를 이용해 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 있는 토큰이 일치하는지 판단
    // findeOne() --> 몽고DB 메서드
    user.findOne({ "_id": decoded, "token": token }, function (err, user) {

      if (err) return cb(err);
      cb(null, user)
    })
  })

}



// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema);

// 외부에서 쓸 수 있도록 모듈화
module.exports = { User };
