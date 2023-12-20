---
layout: post
title : Node.JS Express 웹 서버 구동하기
tag : [Javascript, Node.js]
---
안녕하세요 yagsill 입니다.
  
오늘은 node.js 를 사용해서 웹 서버를 구동해 보겠습니다.
  
node.js 는 **아파치 설치가 따로 필요 없이 프레임워크 하나로 웹 서버를 구동**할 수 있습니다.
  
1. 일단 package.json을 설치하기 위해서 npm init을 실행해 줍니다.
***해당 프로젝트 내 터미널에서 npm init실행**
```linux
$npm init
```
2. express 설치
```linux
$npm install express
```
3. index.js 파일 생성

4. index.js 파일 내 코드 작성
```javascript
const express = require("express");
const port = 3333;
const app = express();
app.get("/", (req, res) => {
  res.send("안녕하세요 Node.js dnpq 서버 입니다!");
});
app.listen(port, () => {
  console.log("Server Start....");
});
```

5. 터미널에서 해당 명령어 입력
```linux
$node index.js
```

6. localhost:3333 포트로 들어가기.
![web](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbISO0S%2FbtsjlXD7sd6%2F8zqSmRBfvzdPcoWosWvbiK%2Fimg.png)
  
감사합니다.