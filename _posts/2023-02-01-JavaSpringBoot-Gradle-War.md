---
layout: post
title : Java Spring Boot Gradle tomcat9 배포
listTitle : JAVA .war파일 톰캣 배포
listSubTitle : 1.gradle war파일 추출순서
listSubTitle2 : 2.gradle war파일 위치
listSubTitle3 : 3.tomcat web 배포 방법
listSubTitle4 : 4.배포한 URL 직접 접속 확인
tag : [JAVA, SpringBoot, tomcat]
---

안녕하세요 Yagsill입니다.
  
Java Spring Boot으로 로컬에서 실행하고 tomcat으로 배포해 보겠습니다.
  

![gradle](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbwfLP4%2Fbtr0NMPmXgO%2FiM3S8G6WxkbQKgt3J9xkG1%2Fimg.png)
  
Gradle로 war파일을 추출하려면 요 코끼리를 빌드해야합니다

<div id="subTitle">
</div>
  
순서 : **코끼리 클릭 -> project_name -> Tasks -> build -> clean -> build**
  
<div id="subTitle2">
</div>

이렇게 빌드때리면 war 파일이 떨어집니다.
위치 : project_Directory/project/build/libs/

![warFile](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbaSAZQ%2Fbtr0RKjsXjk%2FmZYuwBqcFKKk8ftaQzEnl0%2Fimg.png)
  
위 경로에 .war 파일이 생성됩니다. 이후 해당 war 파일을 tomcat에 올려보겠습니다.
  
***일단 기본적으로 apache tomcat이 설치되어있어야 합니다**
  
***저는 Java 11 / tomcat9 버전을 사용하고 있습니다.**
  
추출한 war 파일을 서버에 배포해 봅시다.
  
<div id="subTitle3">
</div>
  
![tomcat](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgfTzO%2Fbtr1nv5g6ma%2FM8GEn3YuJSGq78b1rCMKa1%2Fimg.png)
  
<div id="subTitle4">
</div>

주소 : **내IP주소:포트/manager/html**
  
파일 선택 -> 아까 추출한 war파일 선택 -> 배치를 하게 되면 war 파일이 path부분에 생성됩니다.
  
배포후 해당 경로로 검색해서 들어가면 저의 swagger 페이지가 표시 됩니다.

  
![swagger](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcKfIUW%2Fbtr1fOxCyP0%2FsYoXaTP80FWGPVJi6VMhk1%2Fimg.png)

짠
  
감사합니다.