---
layout: post
title : Node.JS Rest API 구현 GET방식 + Postman
tag : [Javascript, Node.js]
---
안녕하세요 yagsill 입니다.
  
간단하게 get, post api를 만들어서 포스트맨으로 사용해 보겠습니다.
  
일단 폴더 구조 입니다.
  
![folder](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9jpX5%2FbtsjmuIyp66%2FXmr5JNXZ1cO4yOXVNsBkPK%2Fimg.png)
  
```javascript
// app.js
const express = require("express");
const port = 3200;
const router = require("./loaders/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("BackEnd Server Page");
});

app.listen(port, () => {
  console.log("Server Start....");
});
```
  
위는 app.js 파일입니다. 파일 빌드 시 제~~일 처음으로 실행되는 스크립트 파일인데요 router를 사용해서 api가 있는 스크립트 파일을 실행해 볼겁니다. 아래 코드를 봐주세용.
  
```javascript
//router.js
const express = require("express");
const router = express.Router();

const web = require("../api/web"); 

router.use("/api/web", web); // 호출되는 url 주소입니다. http://localhost:3200/api/web/ 으로 호출 됨.

module.exports = router;
```
  
이제 실제 작동되는 API파일인 web.js를 살펴볼게요
  
```javascript
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  return res.json({
    resultCode: 200,
    resultMsg: "성공",
    data: "Web Call Success",
  });
});
```

![get](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcrO5iL%2FbtsjsfDQcrB%2FAfXl8nbxy4Gih1DNYSAX70%2Fimg.png)
  
짠! 감사합니다.