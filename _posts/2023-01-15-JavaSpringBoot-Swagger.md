---
layout: post
title : Java Spring Boot Swagger 연결하기
tag : [JAVA, SpringBoot, Swagger]
---
  
안녕하세요 API를 좀더 직관적으로 볼 수 있게 Swagger 페이지를 연동해 보았습니다.
```java
// Controller
@RestController
@RequestMapping("/first")
@Tag(name = "first", description = "App 실행시 최초 실행")
public class firstController {

    @Autowired
    private FirstService firstService;

    @Operation(summary = "버전체크", description = "앱 실행시 버전체크", tags = {"first"})
    @ApiResponses(
        value = {
            @ApiResponse(description = "OK", responseCode = "200",
             content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE
                ,schema = @Schema(implementation = first.In.class)
                )}),
        }
    )
    @PostMapping(value = "", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> index(@Parameter first.In in) {
        return new ResponseEntity<>(firstService.index(in), HttpStatus.OK);
    }
}
```
```java
// Dao
@Mapper
public interface InitDao {
    public FirstDto.Out SQL이름(FirstDto.In in);
}
```
Mapper Annotation을 사용하여 XML 파일에 접근할 수 있습니다.
  
dto 부분입니다.
```java
//Dto
@Data
public class FirstDto {
    @Data
    public static class In {
        @Schema(example = "홍길동", description = "이름")
        private String name;
    }

    @Data
    public static class Out {
        @Schema(example = "20", description = "나이")
        private Integer age;
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

        @Schema(implementation = FirstDto.Out.class)
        private Map<String, Object> data;
    }
}
```
In -> swagger의 입력부분입니다.
  
Out -> 리턴값이라고 생각하면 됩니다.
```java
//Service
public class FirstService {
    @Autowired
    private FirstDao FirstDao;

    public FirstDto.Result index(FirstDto.In in) {
    	FirstDto.Out out = new FirstDto.Out();
        out = FirstDao.SQL이름(in);

        if(out == null) {
            System.out.println("에러가 나버렸습니다.")
        }
        
        System.out.println(out.getName());

        return FirstDto.Result.builder().build();
    }
}
```
감사합니다.
  