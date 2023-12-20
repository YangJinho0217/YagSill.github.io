---
layout: post
title : Java Spring Boot Swagger 회원가입하기
tag : [JAVA, SpringBoot, Swagger]
---
안녕하세요 yagsil 입니다.
  
오늘은 spring boot과 swagger를 연동해서 회원가입 툴을 만들어 보겠습니다.
```java
// Controller
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "앱 회원가입", description = "회원가입 시 호출", tags = { "user" })
    @ApiResponses(value = {
            @ApiResponse(description = "OK", responseCode = "200", content = {
                    @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SignUpDto.Result.class)) }),
    })

    @PostMapping(value = "signUp", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> signUp(@Parameter SignUpDto.In in) {
        return new ResponseEntity<>(userService.signUp(in), HttpStatus.OK);
    }
}
```
```java
// DTO
public class SignUpDto {

    @Data
    public static class In {
        @Schema(example = "altm56", description = "아이디")
        private String userId;
        @Schema(example = "1111", description = "비밀번호")
        private String passwd;
        @Schema(example = "왕눈이", description = "닉네임")
        private String userName;
        @Schema(example = "사원", description = "직급")
        private String userRank;
        @Schema(example = "504", description = "호실")
        private String userRoom;
        @Schema(example = "01000000000", description = "전화번호")
        private String userPhone;
    }

    @Data
    public static class Out {
        @Schema(example = "성공!", description = "성공 메세지")
        private String data;

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

        @Schema(implementation = SignUpDto.Out.class)
        public Map<String,Object> data;
    }
}
```
```java
// DAO
@Mapper
public interface UserDao {
   public void insertAppSignUp(Map<String,Object> param);
   public Map<String,Object> selectAppId(Map<String,Object> param);
}
```
```java
// Service
public SignUpDto.Result signUp(SignUpDto.In in) {

        Map<String, Object> param = new HashMap<String,Object>();
        param = om.convertValue(in, new TypeReference<Map<String,Object>>(){});
        Map<String,Object> result = new HashMap<String,Object>();

        if (param.get("userId") == null) {
            result.put("error", "아이디를 입력해 주세요");
            return SignUpDto.Result.builder().data(result).build();
        } else if(param.get("passwd") == null) {
            result.put("error", "비밀번호를 입력해 주세요");
            return SignUpDto.Result.builder().data(result).build();
        } else if(param.get("userName") == null) {
            result.put("error", "닉네임을 입력해 주세요");
            return SignUpDto.Result.builder().data(result).build();
        } else if(param.get("userRank") == null) {
            result.put("error", "직급을 입력해 주세요");
            return SignUpDto.Result.builder().data(result).build();
        } else if(param.get("userRoom") == null) {
            result.put("error", "방번호를 입력해 주세요");
            return SignUpDto.Result.builder().data(result).build();
        }

        Map<String,Object> appId = userDao.selectAppId(param);

        if (appId != null) {
            result.put("error", "사용할 수 없는 아이디 입니다");
            return SignUpDto.Result.builder().data(result).build();
        } 

        userDao.insertAppSignUp(param);
        result.put("user", "회원가입에 성공하였습니다");
        return SignUpDto.Result.builder().data(result).build();
    }
```