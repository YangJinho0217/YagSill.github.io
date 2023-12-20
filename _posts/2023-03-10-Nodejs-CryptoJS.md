---
layout: post
title : Node.JS Crypto-js로 암호화 복호화 해보기
tag : [Javascript, Node.js]
---

안녕하세요 Yagsill 입니다.  
  
백엔드에서 로그인 또는 회원가입 할 때 비밀번호를 DB에 대충 때려넣으면 문제가 생깁니다.  
그래서 암호화를 하고 DB에서 가져온 비밀번호를 또 복호화 해서 로그인, 회원가입 처리를 해주어야 하는데 말이죠  
crypto-js로 진행해 보겠습니다.
  
crypto-js 패키지를 설치해 줍니다.
```linux
$npm install crypto-js
```
  
암호화 및 복호화를 진행할 스크립트에 추가해 줍니다.
```javascript
const cryptojs = require("crypto-js");
const encryptedKey = "암복호화키를 넣어주세용";
```
  
암호화, 복호화 기능 따로 분리해서 함수로 만들어 줍니다.
```javascript
function encryptPassword(password, encryptedKey) {
  var cipherText = cryptojs.AES.encrypt(password, encryptedKey).toString();
  return cipherText;
}

function decryptPassword(password, encryptedKey) {
  var bytes = cryptojs.AES.decrypt(password, encryptedKey);
  var originalText = bytes.toString(cryptojs.enc.Utf8);

  return originalText;
}
```
  
암호화할 비밀번호 encryptPassword에 넣어주기 / 복호화할 비밀번호 decryptPassword에 넣어주기
```javascript
var password = encryptPassword('암호화할 데이터', encryptedKey);
```
  
이렇게 하고 password를 찍어볼게요.  
저의 비밀번호는 1234 로 넣어봤습니다.
```xml
U2FsdGVkX1/EVsoQ9MthIx1jPHI/j7C6ZlJRfXspHY8=
```
  
이제 클라이언트에서 서버로 비밀번호 평문을 보내면 서버에서 암호화를 해서 DB에 넣어주고  
암호화된 비밀번호를 DB에서 가져와서 복호화를 시켜주면 평문이 됩니다.  
  
복호화도 진행해 보죠
```javascript
// const dbPassword = "DB에서 가져온 데이터"
var password = decryptPassword(dbPassword, encryptedKey);
```
  
DB에서 값을 가져온 후 decryptPassword 함수에 첫번째 매개변수로 넣어주고  
두번째 매개변수에는 encryptedKey 키값을 넣어주게 되면 password 변수에는 평문이 저장이 되겠죠? 

 
감사합니다.