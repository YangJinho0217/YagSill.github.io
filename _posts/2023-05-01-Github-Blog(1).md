---
layout: post
title : Github Blog 만들기(1) + sourceTree
listTitle: Github Blog 만들기
listSubTitle : 1.Repository 만들기
listSubTitle2 : 2.Repository 내용 작성
listSubTitle3 : 3.GitClone 하기(SourceTree 사용)
tag : [Github]
toc : true
---

안녕하세요 Yagsill 입니다.
  
기존에는 Tistory를 사용하고 있었는데 포트폴리오도 만들겸 Github의 블로그를 운영해 보기로 했습니다.
  
일반 블로그와는 다르게 Github 블로그는 코드로 직접 구현해야해서 조금 어렵습니다 ;;; ㅋㅋ
  
일단 Github의 Repository 만들어 줍니다.

<div id="subTitle"></div>

## **1. Github Repository 만들기**
![image](/assets/repositoryNew.png)

* [New] 버튼을 통해 Repository를 생성해 봅시다
<div id="subTitle2"></div>

## **2. Repository 내용 작성**
![image](/assets/repositoryCreate.png)

* Repository Name : 계정이름.github.io로 만들어줘야 합니다.  
* Public/Private : 공개설정 / 비공개설정 공개로 설정해주세요.
* README file : 해당 Repository의 설명서이므로 나중에 추가 하셔도 됩니다.
* Create Repository 버튼 클릭

<div id="subTitle3"></div>

## **3. GitClone 하기(SourceTree 사용)**
  
Terminal 창에서 직접 Git을 push하고 pull해도 괜찮지만 SourceTree를 사용하면 엄청 간편합니다.
![image](/assets/sourceTreeMenu.png)

* Remote 버튼을 통해 해당 Repository를 찾아줍니다.

![image](/assets/sourceTreeClone.png)

* 해당 Repository를 clone 해주면 됩니다.

![image](/assets/sourceTreeMenus.png)

* commit : 변경사항이 생기면 변경사항을 저장할 수 있습니다.
* pull : 브랜치항목에 Remote 메인항목의 데이터를 pull로 받아올 수 있습니다.
* push : 변경사항이 저장된 브랜치를 메인브랜치로 전송할 수 있습니다.

이후 VSCode나 코드 에디터에서 저장된 폴더를 열어주기만 하면 됩니다.
  
그리고 터미널로 해당 폴더의 위치로 들어가 서버를 켜주면 됩니다.