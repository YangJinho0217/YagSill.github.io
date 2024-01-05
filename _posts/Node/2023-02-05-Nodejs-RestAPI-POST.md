---
layout: post
title : Node.JS Rest API 구현 POST방식 + Postman
listTitle : Express POST API 구현
listSubTitle : 1.Folder Structure 확인
listSubTitle2 : 2.app.js 
listSubTitle3 : 3.router.js
listSubTitle4 : 4.web.js 
listSubTitle5 : 5.postman Return Json 확인
tag : [Javascript, Node.js]
---
안녕하세요 Yagsill 입니다.
  
저번 포스팅에 이어서 이번엔 POST 방식으로 API를 호출해 보겠습니다.
  
일단 폴더 구조 입니다.
<div id="subTitle"></div>

  
![folder](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9jpX5%2FbtsjmuIyp66%2FXmr5JNXZ1cO4yOXVNsBkPK%2Fimg.png)
  
<div id="subTitle2"></div>

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
  
<div id="subTitle3"></div>

```javascript
//router.js
const express = require("express");
const router = express.Router();

const web = require("../api/web"); 

router.use("/api/web", web); // 호출되는 url 주소입니다. http://localhost:3200/api/web/ 으로 호출 됨.

module.exports = router;
```
  
이제 실제 작동되는 API파일인 web.js를 살펴볼게요
  
<div id="subTitle4"></div>

```javascript
const express = require("express");
const router = express.Router();

//GET 방식
router.get("/", function (req, res) {
  return res.json({
    resultCode: 200,
    resultMsg: "성공",
    data: "Web Call Success",
  });
});

// POST 방식
router.post("/", function (req, res) {
  var param = {
    testParam: req.body.testParam,
  };

  return res.json({
    resultCode: 200,
    resultMsg: "POST 성공!",
    data: param,
  });
});
```
  
저는 파라미터를 하나 넘겨주려고 testParam 이라고 하나 넣어보았습니다.
  
node.js 에서 param은 req.body 안에 있어요 그래서 포스트맨으로 post요청할때 파라미터 넣어서 보내주면 req.body로 받아야합니다.
  
그리고 제가 return 값으로 받은 파라미터 값을 그대로 리턴해 주고 있어요(이해하기 쉽도록...)
  
일단 직접 postman으로 호출해 볼게요!
<div id="subTitle5"></div>

  
![post](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEtK9O%2FbtsjmCmapFa%2FPXQDXoZKoq3tZ8uMf4Fmqk%2Fimg.png)
  

key 값에 testParam 넣어주고 value에 GOOD이라는 문자를 넣어 봤씁니다.
  
이전에 제가 return 값을 그대로 보내준다고 했잖아요? 그랬더니 data에 보냈던 파라미터를 그대로 리턴해 준게 확인 되었습니다!
  
감사합니다.