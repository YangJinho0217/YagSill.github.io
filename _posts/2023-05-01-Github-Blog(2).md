---
layout: post
title : Github Blog 만들기(2) + jekyll
listTitle: Github Blog + jekyll 사용
listSubTitle : 1.Ruby 버전확인
listSubTitle2 : 2.Bundler & Jekyll 설치
listSubTitle3 : 3.터미널에서 jekyll server 켜기
tag : [Github]
toc : true
---

안녕하세요 Yagsill 입니다.
  
이전 포스트에 이어서 Github 블로그를 제작해 보겠습니다.
  
이번에는 Ruby와 Jekyll이 필요합니다.
  
기본적으로 [MAC]에는 Ruby가 설치되어 있습니다. 근데 간혹 Ruby 버전 이슈로 설치가 안될수도 있으니 필요한 버전을 꼭 설치바랍니다.
  
아무튼 Ruby 사이트에서 Ruby를  다운로드 받아서 실행시켜 주면 자동적으로 설치가 됩니다. 이후 터미널에서 해당 명령어를 입력해 주세요
  
<div id="subTitle"></div>

## **1. Ruby 버전확인**
  
```linux
$ruby --version
>ruby 3.2.2
```
Ruby 버전 확인 성공!
  
<div id="subTitle2"></div>

## **2. Bundler & Jekyll 설치**
  

```linux
$gem install bundler
$bundler --version
>Bundler version 2.5.1
```
  
bundler 설치 성공!
  
```linux
$gem install jekyll
$jekyll --version
>jekyll 4.3.2
```
  
jekyll 설치 성공!
  
<div id="subTitle3"></div>
  
## **3. 터미널에서 jekyll server 켜기**

```linux
bundle exec jekyll serve
```
![image](/assets/terminal_jekyllServe.png)
  
서버 켜기 성공!
* 웹페이지에서 http://127.0.0.1:4000 으로 들어가면 됩니다.