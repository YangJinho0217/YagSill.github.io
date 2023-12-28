---
layout: post
title : Node.JS JWT 생성하기
listTitle : Node.JS JWT토큰 생성
listSubTitle : 1.jsonwebtoken 패키지 설치
listSubTitle2 : 2.jwt.js 생성 
listSubTitle3 : 3.api 호출 부분 jwt require 시키기
listSubTitle4 : 4.postman 호출 확인
listSubTitle5 : 5.JsonWebTokenError 해결
tag : [Javascript, Node.js]
---

안녕하세요 Yagsill 입니다.
  
오늘은 JWT 토큰을 생성해보고 postman으로 호출을 해보겠습니다.
<div id="subTitle"></div>

일단 jsonwebtoken 패키지 설치가 필요합니다.
```linux
$npm install jsonwebtoken
```

그리고 jwt.js 파일을 만들어 주세요  
(굳이 스크립트 파일을 따로 뺴서 작성하는 이유는 전역으로 다양한 곳에서 jwt인증을 하기 위함입니다)  
(그리고 코드의 재사용성에 좋습니다)
<div id="subTitle2"></div>

```javascript
// jwt.js
const jwt = require("jsonwebtoken");
const jwtScreetKey = "여기다가 키를 생성해주세요";

const token = {
  create: (param) => {
    try {
      var token = jwt.sign({ param }, jwtScreetKey, {});
      console.log("token 생성 : ", token);
    } catch (err) {
      console.log("token ERROR : ", err);
    }
    return token;
  },

  auth: (req, res, next) => {
    try {
      req.decoded = jwt.verify(
        req.headers.authorization, jwtScreetKey);
      console.log("<--- Access Token --->");
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(419).json({
          code: 419,
          message: "토큰이 만료되었습니다",
        });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          code: 401,
          msg: "유효하지 않은 토큰입니다.",
        });
      }
    }
  },
};

module.exports = token;
```
  
이후 API 요청 하는 부분에 jwt를 require 해줍니다.
<div id="subTitle3"></div>

```javascript
const auth = require("../loaders/jwt").auth; // jwt.js파일의 경로 내 프로퍼티 입니다.
const token = require("../loaders/jwt"); // jwt.js파일의 경로 입니다.

router.post("/login", async (req, res, next) => {
	var param = {
    	user_id : req.body.user_id,
        user_pw : req.body.user_pw
    }
    
    // 대충 여기서 DB에 쿼리 날려서 아이디 패스워드 정보 받아오고 난 후
    // user_id 와 user_pw 정보가 DB정보와 같다면 토큰을 생성해 주시면 됩니다.
    
    return res.json({
    	msg : '로그인에 성공하였습니다/',
        code : 200,
    	token : token.create(param)
    })
});
```
  
auth 는 jwt.js 안에 있는 auth 프로퍼티 입니다.  
로그인할 때 이 토큰을 res.json으로 응답을 날려줄 때 토큰을 생성해 주세여.
<div id="subTitle4"></div>
  
postman으로 호출해 보겠습니다.
```json
{
    "resultCode": 200,
    "resultMsg": "성공",
    "data": {
        "user_id": "admin",
        "user_pw": "U2FsdGVkX18iUUtyldVFFypmfkE/AtqvXC3mFT2wyzE=",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2ODY2NjIwMDZ9.VWUHqSU_ldgq7ZXDDBTnwsKuNmn35lZMWkXcmPKTLKg"
    }
}
```
  
일단 잘 들어오고 있습니다.
  
<div id="subTitle5"></div>

**JsonWebTokenError: invalid token** 에러 표시 해결 방법(토큰이 유효하지 않은 에러)
  
일단 이 에러가 나타난 이유는  
postman에서 req.headers.authorization이 --->  Bearer [token] 형식으로 되어 있습니다.  
req.headers를 console 찍어보면 아래처럼 나옵니다.  
```xml
authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2ODY2MzYyNjl9.gKSeobgzFTFgX7PF2yycawCOMSpA8_eguUnKUlTTI6c'
```
  
javascript 에서 잘라주면 됩니다.  
```javascript
try {
  req.decoded = jwt.verify(
    req.headers.authorization.split("Bearer ")[1],
    jwtScreetKey
  );
 }
```  
이런식으로 잘라주면 postman에서도 호출이 잘 되는것을 확인할 수 있습니다 ㅎㅎ

![json](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbeoBgC%2FbtsjJaK5I8O%2FZOcWpYPPe7e1TVFlS3lygK%2Fimg.png)
  
감사합니다.