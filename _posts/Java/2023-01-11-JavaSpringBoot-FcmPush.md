---
layout: post
title : Java Spring Boot FCM PUSH 연동하기
listTitle : JAVA FCM Push 연동
listSubTitle : -Service 훑어보기
listSubTitle2 : -Controller 훑어보기
listSubTitle3 : -Ajax 훑어보기
tag : [JAVA, SpringBoot, Firebase]
---
  
JAVA에서 firebase로 push 기능을 연동하는 방법에 대해서 설명해 보겠습니다.
  

<div id="subTitle">
Service 부분입니다.
</div>

```java
public class FirebaseCloudMessageService {

    static ClassPathResource resource = new ClassPathResource("/firebase/firebaseServiceKey.json");

    private final String API_URL = "https://fcm.googleapis.com/v1/projects/'프로젝트이름'/messages:send";

    private final ObjectMapper objectMapper;

    public void sendMessageTo(String targetToken, String title, String body) throws Exception {
        String message = makeMessage(targetToken, title, body);
        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=utf-8")
                .build();

        Response response = client.newCall(request).execute();

        log.info(response.body().string());
    }

    private String makeMessage(String targetToken, String title, String body) throws JsonProcessingException {
        FcmMessage fcmMessage = FcmMessage.builder().message(FcmMessage.Message.builder().token(targetToken)
                .notification(FcmMessage.Notification.builder().title(title).body(body).image(null).build())
                .build()).validate_only(false).build();

        log.info(objectMapper.writeValueAsString(fcmMessage));
        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws Exception {
        // 2)
        String firebaseConfigPath = resource.getPath();

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }

}
```
firebase에서 프로젝트를 등록한 후 json 키를 받아서 프로젝트에 넣어주고 new ClassPathResource부분에 경로를 입력합니다.
  
API_URL 같은 경우에는 저 링크 그대로 갖다 쓰셔도 됩니다. 단 '프로젝트 이름' 에는 본인의 firebase 프로젝트 이름을 넣어야 합니다.
  
서비스 기능을 만들어 놓고 이제 컨트롤러에서 호출해주면 됩니다.
  
<div id="subTitle2">
Controller 부분입니다.
</div>

```java
// Controller 부분

@RequestMapping(value = "/02/fcmMessage", method = RequestMethod.POST)
@ResponseBody
public Object testPostBodyJson(@RequestParam(value = "arrStr") List<String> arrStr,
        @RequestParam(value = "idx") String idx,
        @RequestParam(value = "name") String name, Model model)
        throws Exception {

    Map<String, Object> resultMap = new HashMap<String, Object>();
    try {
        if (arrStr != null && arrStr.size() > 0) {
            for (int i = 0; i < arrStr.size(); i++) {
                firebaseCloudMessageService.sendMessageTo(arrStr.get(i), idx, name);
            }
            resultMap.put("result", "success");
        } else {
            resultMap.put("result", "false");
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return resultMap;
}
```

ajax로 javascript를 이용해 호출하는 클라이언트부분입니다.
  
<div id="subTitle3">
Ajax 호출 부분 입니다.
</div>

```javascript
// ajax 부분

$(document).ready(() => {

    var checkboxIndex = 0;
    var rowData = new Array();
    var tdArr = new Array();
    var appUserIdArr = new Array();

    // 보내기 눌렀을 때
  $("#selectBtn").click(function(){

        var checkbox = $("input[name=user_CheckBox]:checked");
        checkboxIndex = checkbox.length;
        checkbox.each(function(i) {
            var tr = checkbox.parent().parent().eq(i);
            var td = tr.children();
            
            rowData.push(tr.text());
            
            var deviceToken = td.eq(3).text();
            var appUserId = td.eq(4).text();
            
            tdArr.push(deviceToken);
            appUserIdArr.push(appUserId);
            
            console.log("deviceToken : " + deviceToken);
            console.log("appUserId : " + appUserId);
    
            });
    });

    //tdArr 토큰 배열 초기화
    $('#deleteToken').click(function() {
        tdArr = [];
        appUserIdArr = [];
    }) 


    //보내기 누르고 전송 했을때
    $('#postMessage').click(function() {
        var reqURL = CONTEXTROOT + '/app/02' + '/fcmMessage';
        var reqURL2 = CONTEXTROOT + '/app/02' + '/appPushList';
        if (tdArr.length == 0) {
            alert("대상을 선택하셔야 합니다.");
        } else if(checkboxIndex >= 5) {
            alert("대상은 5명까지 선택이 가능합니다.")
        } else {
            Loading()
            $.ajax({
                url: reqURL,
                type: "post",
                traditional: true,
                data: {
                    idx : $('#fileGrpTitle').val(),
                    name : $('#messageInfo').val(),
                    arrStr : tdArr
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    alert("정상 처리 되었습니다.");
                    location.href = CONTEXTROOT + "/app/02/"
                },
                error:function(request,status,error){
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });

            $.ajax({
                url: reqURL2,
                traditional: true,
                type: "post",
                data: {
                    idx : $('#fileGrpTitle').val(),
                    name : $('#messageInfo').val(),
                    arrStr : tdArr,
                    appUserIdArr : appUserIdArr
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                },
                error:function(request,status,error){
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            })
        }
    })
 });
```
감사합니다.
  