---
layout: post
title : Github Blog 만들기(3) + jekyll Theme
listTitle: Github jekyll Theme
listSubTitle : 1.Jekyll 파일 생성
listSubTitle2 : 2.jekyll Theme + Chrispy
listSubTitle3 : 3.zip파일 압축해제
listSubTitle4 : 4.bundle install
listSubTitle5 : 5.jekyll server 켜기
tag : [Github]
toc : true
---

안녕하세요 Yagsill 입니다.
  
이전 포스트에 이어서 Github 블로그에 jekyll Theme를 사용해보죠
  
해당 링크에서 Jekyll Theme를 골라주세요.
	
**[[ Jekyll Theme Download]](http://jekyllthemes.org/){:target="_blank"}**
  
<div id="subTitle"></div>

## **1. Jekyll 파일 생성**
  
본인의 GIthub 폴더로 이동해서 해당 명령어 입력
  
```linux
$jekyll new ./
```
  
![image](/assets/jekyllFolder.png)
  
일단 이런식으로 폴더에 여러가지 파일들이 생성이 됩니다.
* sourceTree에서 Clone한 폴더로 이동해 터미널을 열어준다.
* 터미널에서 $jekyll new ./ 명령어를 입력해 준다.
* 폴더 내 파일들 생성까지 확인!
  
<div id="subTitle2"></div>

## **2. jekyll Theme + Chirpy**
  
여러 템플릿이 있는데 많은 분들이 사용하는 **Chirpy** 테마를 사용해 보겠습니다.

![image](/assets/Chrispy_theme_download.png)

![image](/assets//Chrispy_theme.png)

Download 버튼으로 테마를 다운로드 해주세요
  
<div id="subTitle3"></div>

## **3. zip파일 압축해제**

다운로드된 zip파일을 압축해제 후 안에있는 모든 파일을 본인의 Repository 폴더 안으로 전부 넣어줍니다.
* Repository 폴더란 Git Clone한 폴더 입니다

![image](/assets/jekyll_cover_file_all.png)
  
![image](/assets/jekyll_cover_file_agree.png)
  
[모두적용] 체크 후 **대치** 를 눌러줍니다.
  
<div id="subTitle4"></div>

## **4. bundle install**

일단 모든 Chirpy 파일들을 옮겼으면 bundle install을 통해 Chirpy의 패키지들을 설치해 줘야 합니다.
  
```linux
$bundle install
```
  
<div id="subTitle5"></div>

## **5. jekyll server 켜기**
  
이제 폴더에서 터미널을 켜줍니다.
  
아래 명령어로 서버를 켜주기만 하면 됩니다.

```linux
$bundle exec jekyll serve
```

**http://127.0.0.1:4000 접속**

![image](/assets/jekyll_chrispy.png)
  
Jekyll 테마를 이용해 여러가지 Custom을 해보면 됩니다. 다음 포스팅은 여러가지 커스텀을 해보겠습니다.
  
감사합니다.