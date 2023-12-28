---
layout: post
title : Java Spring Boot Swagger Login 
listTitle : JAVA Swagger + 로그인
listSubTitle : 1.Controller 훑어보기
listSubTitle2 : 2.Dto 훑어보기
listSubTitle3 : 3.Service 훑어보기
listSubTitle4 : 4.Mapper 훑어보기
tag : [JAVA, SpringBoot, Swagger]
---

이전 포스트에 이어서 로그인 툴을 만들어 보겠습니다.
<div id="subTitle">
</div>

```java
// Controller
@RestController
@RequestMapping("/user")
@Tag(name = "user", description = "유저관련")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "앱 로그인", description = "로그인 시 호출", tags = { "user" })
    @ApiResponses(value = {
            @ApiResponse(description = "OK", responseCode = "200", content = {
                    @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = UserDto.Result.class)) }),
    })

    @PostMapping(value = "login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> login(@Parameter UserDto.In in) {
        return new ResponseEntity<>(userService.login(in), HttpStatus.OK);
    }

}
```
로그인하려면 파라미터로 아이디랑 패스워드를 받아야 하잖아요? 그 부분은 DTO에서 받아보도록 하겠습니다.
<div id="subTitle2">
</div>
  
```java
// DTO
@Data
public class UserDto {

    @Data
    public static class In {
        @Schema(example = "test", description = "유저 아이디")
        private String userId;
        @Schema(example = "1111", description = "비밀번호")
        private String passwd;
    }

    @Data
    public static class Out {
        @Schema(example = "227", description = "유저 아이디")
        private Integer userId;
        @Schema(example = "1111", description = "유저 패스워드")
        private String userPassword;
        @Schema(example = "홍길동", description = "유저 이름")
        private String userName;
        @Schema(example = "사원", description = "직급")
        private String userRank;
        @Schema(example = "1204호", description = "유저 방번호")
        private String userRoom;
        @Schema(example = "01000000000", description = "전화번호")
        private String userPhone;
    }

    @Data
    @Builder
    public static class Result {
        @Builder.Default
        @Schema(example = "200")
        private Integer resultCode = 200;

        @Builder.Default
        @Schema(example = "OK")
        private String resultMsg = "OK";

        @Schema(implementation = UserDto.Out.class)
        public Map<String,Object> data;
    }
}
```
DTO의 In 부분은 swagger에서 파라미터값으로 넣는 값들 입니다. 
Out 부분은 쿼리를 돌리고 나서 뱉어내는 객체타입의 값입니다. mapper에서 설정을 잘 해주셔야 합니다.
<div id="subTitle3">
</div>

```java
// Service
@Service
public class UserService {
    
    @Autowired
    private UserDao userDao;

    ObjectMapper om = new ObjectMapper();

    public UserDto.Result login(UserDto.In in) {

        Map<String, Object> param = new HashMap<String,Object>();
        param = om.convertValue(in, new TypeReference<Map<String,Object>>(){});
        Map<String,Object> result = new HashMap<String,Object>();

        Map<String,Object> user = userDao.selectAppLogin(param);
        if (user == null) {
            result.put("user", "유저 정보가 없습니다");
            return UserDto.Result.builder().data(result).build();
        }

        Object passwordData = user.get("userPassword");
        String passwordDb = (String) param.get("passwd");

        if(!passwordData.equals(passwordDb)) {
            result.put("error", "비밀번호가 일치하지 않습니다.");
            return UserDto.Result.builder().data(result).build();
        }

        result.put("user", user);
        return UserDto.Result.builder().data(user).build();
    }
    
}
```
-> 일단 sql로 아이디정보를 가지고 해당 데이터를 조회해옵니다. 그 부분이 Map<String, Object> 타입의 user에 저장이 됩니다.
  
-> 두번째로는 user에 저장된 패스워드를 가지고 파라미터로 전송된 비밀번호와 비교를해서 맞지 않으면 에러를 뽑아내도록 합니다.
  
-> 아이디로 조회가 잘 되고, 비밀번호도 맞을경우 return을 해줍니다.
  
return에 값이 들어갈때는 DTO에 data 타입과 맞는 타입이여야 해요.
  
DTO에 보시면 Result 부분에있는 data타입이 public Map<String,Object> data 타입이기 때문에 Service부분에서 담아줄 타입도 Map<String,Object> 타입인 result로 설정했습니다.
  
다음은 mapper 입니다.
<div id="subTitle4">
</div>

```xml
// Mapper
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="star.inter.dao.UserDao">

    <select id="selectAppLogin" resultType="map" parameterType="map">
        select a.user_id AS userId
             , a.user_password AS userPassword
             , a.user_name AS userName
             , a.user_rank AS userRank
             , a.user_room AS userRoom
             , a.user_phone AS userPhone
             , a.rgst_dt AS rgstDt
        from   user_Info a
        where a.user_id = #{userId}
    </select>
    
```
감사합니다.