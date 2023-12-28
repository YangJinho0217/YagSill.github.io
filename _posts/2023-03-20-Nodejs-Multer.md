---
layout: post
title : Node.JS API multer 이미지 업로드 + [postman 사용]
listTitle : Node.js 이미지 업로드 방법
listSubTitle : 1.multer 패키지 설치
listSubTitle2 : 2.multer.js 파일 추가 
listSubTitle3 : 3.API 호출 해보기
listSubTitle4 : 4.postman 확인
tag : [Javascript, Node.js]
---

안녕하세요 yagsill 입니다.  
이미지를 parameter에 넣어 API를 호출해보겠습니다.
<div id="subTitle"></div>
  
multer pacakage를 설치해 줍시다.
```linux
$npm install multer
```
  
<div id="subTitle2"></div>

multer.js를 생성해 작성해 줍니다.
```javascript
const multer = require("multer"); //multer 패키지 참조

const days = new Date().toLocaleDateString().replace(/\./g, "").replace(/ /g, ""); // 20230615 형식의 현재 시간 나타내기

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "여기에는 이미지가 떨어질 폴더 경로");
  },
  filename: function (req, file, cb) {
    cb(null, days + " - " + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
```
  

스크립트 파일을 굳이 밖으로 안빼겠다면 상관 없습니다.  
그러나 우리는 코드의 재사용을 항상 염두해 두기 위해 스크립트를 따로 뺄겁니다.
  
<div id="subTitle3"></div>

api 호출 부분 작성
```javascript
const upload = require("../loaders/multer");

router.post("/", upload.single("file"), async (req, res, next) => {

  var param = {
    file: req.file,
  };
  
  return res.json({
    resultCode: 200,
    resultMsg: "파일 업로드 성공",
  });
});

module.exports = router;
```
  
간단하게 호출하면 return으로 json 데이터 넘겨줘 볼게요.  
그리고 파일이 실제로 떨어지는지 확인 하기 위해 **multer.js에서 작성한 파일이 떨궈질 경로에 실제로 폴더를 만들어 줘야 합니다**
  
이미지가 떨어질 폴더를 생성해 줍시다.
![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEvf9X%2Fbtsj6Pyqyhm%2F3v0LT9LbkmkoCk3uWa3TBk%2Fimg.png)
  
이쪽 경로에 이미지를 업로드해 보겠습니다.
  
<div id="subTitle4"></div>

postman으로 확인해 봅시다.
![postman](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1f9U6%2Fbtsj3V048Gb%2Fc9jUMOsZMUkvkKZ8USN1xk%2Fimg.png)
  
![imageFolder](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFhKEB%2Fbtsj3VGL70r%2FH73fW13KPRkkyOWOE8cLL1%2Fimg.png)
  
아주 잘 들어오네요.
  
감사합니다