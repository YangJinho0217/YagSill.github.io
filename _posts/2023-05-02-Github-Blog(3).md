---
layout: post
title : Github Blog 만들기(3) + jekyll Theme
listTitle: Github jekyll Theme
listSubTitle : 1.Jekyll 파일 생성
listSubTitle2 : 2.Repository 내용 작성
listSubTitle3 : 3.GitClone 하기(SourceTree 사용)
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

## **2. jekyll Theme 파일 덮어쓰기**
  

```linux
$gem install bundler
$bundler --version
>Bundler version 2.5.1
```
  
bundler 설치 성공!
## **2. Jekyll 설치**
  
```linux
$gem install jekyll
$jekyll --version
>jekyll 4.3.2
```
  
jekyll 설치 성공!
  

<div id="subTitle3"></div>

## **3. 터미널에서 jekyll server 켜기 **

```linux
bundle exec jekyll serve
```
![image](/assets/terminal_jekyllServe.png)
  
서버 켜기 성공!
* 웹페이지에서 http://127.0.0.1:4000 으로 들어가면 됩니다.