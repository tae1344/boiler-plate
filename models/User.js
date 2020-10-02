// DB 스키마, 모델
const mongoose = require('mongoose');

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
    maxlength: 5
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

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema);

// 외부에서 쓸 수 있도록 모듈화
module.exports = { User };