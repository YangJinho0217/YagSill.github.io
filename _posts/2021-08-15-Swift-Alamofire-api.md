---
layout: post
title : Swift Alamofire API 통신
listTitle : Swift Alamofire API 통신
listSubTitle : -Pod install 방법
listSubTitle2 : -Alamofire API 통신 방법
tag : [Swift, SwiftUI]
toc : true
---

Swift Alamofire 라이브러리로 Rest API 통신을 해보기.  
  
[GET 방식], [POST 방식]
<div id="subTitle">
cocoapods 설치나 설정은 알고 있을거라 예상하고 pod 파일에 Alamofire를 추가해 줍니다.
</div>

```
pod 'Alamofire'
```

<div id="subTitle2">
이후 ViewController에서 라이브러리 import를 시켜 주고 바로 사용해보겠습니다.  
</div>

```swift
import Alamofire
...

class ViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // alamofireTest() <- 함수 호출

    }

    func alamofireTest() {

        var param = Parameters()

        // 파라미터 값 아래에서 넣으면 됨 key value 형식으로 넣어야 합니다.
        param = [
            "key" : "value"
        ] as [String : Any]

        // 실제 Alamofire api 호출 부분
        // method 부분은 .get, .post, .delete, .put 이 있음 입맛에 맞게 method 호출하면 됩니다.
        AF.request("url입력", method : .get, parameters: param, encoding: URLEncoding.default, headers: nil).response { responseData in
                
                switch responseData.result {
                case .success(let value) :
                    // success 값에서 나온 value는 json 
                    // 파싱하고 싶으면 struct 만들어서 값 바인딩 해주고 넣어주면 됩니다.
                    print("success")
                    
                case .failure(_) :
                    print("error")
                }
            }
    }

}
```

이정도 되면 Alamofire 호출은 식은죽 먹기입니다.  

감사합니다.
