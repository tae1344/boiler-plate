// Deploy(배포) 한 후, production 비밀 설정 파일 관리

module.exports = {
  mongoURI: process.env.MONGO_URI // heroku 에서 설정해주면 됨
}