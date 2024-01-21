---
layout: post
title : Swift MVVM 디자인패턴 + 날씨 앱 만들기
listTitle: Swift MVVM 패턴이 뭔데?
listSubTitle : 1.Swift MVVM 패턴
listSubTitle2 : 2.Swift MVVM 패턴 ( Model )
listSubTitle3 : 3.Swift MVVM 패턴 ( View )
listSubTitle4 : 4.Swift MVVM 패턴 ( ViewModel )
listSubTitle5 : 4.Swift MVVM 패턴 ( Service )
tag : [Swift, SwiftUI]
toc : true
---

안녕하세요 Yagsill 입니다.  
  
Swift에서 많이 활용하는 디자인패턴 중 MVVM 패턴에 대해서 알아보도록 하겠습니다!  
  
<div id="subTitle"></div>

# ✨ **Swift MVVM 패턴**
  
* 간단하게 설명하면 Model / View / ViewModel의 앞글자를 따서 M V VM 을 뜻 합니다.
  
* Model : 특정 구조를 뜻합니다.
  
* View : UI적으로 사용자들에게 보여지는 화면을 그리는 것을 뜻합니다.
  
* ViewModel : Controller를 보시면 됩니다. View와 Model의 연결로 알면 좋을 것 같아요.
  
* #Service : Service부분은 MVVM패턴에 상관없지만 특정 서비스를 만들때 사용할 수 있습니다.
  
**공공 API**를 활용해서 최고기온과 최저온도를 가져오는 날씨앱을 만들어 볼게요!
  
<div id="subTitle2"></div>
  
# ✨ **Swift MVVM 패턴 ( Model )**
  
특정 구조를 뜻하는 것으로 예제를 통해 샘플을 만들어 볼게요  
  
[공공 API 주소](https://www.data.go.kr/data/15059093/openapi.do) 입니다.
  
저는 최고기온과 최저기온만 필요하기 때문에 요 두가지만 타겟해서 구조를 만들어 볼게요!
  
![image](/assets/apiImage.png)
  
공공 API요청을 해보면 이런 데이터들이 쫘랄랄랄 나오게 됩니다.
  
여기서 minTa(최저기온) / maxTa(최고기온)만 가져올겁니다.
  
```xml
ResponseData(data: {
  "response" : {
    "body" : {
      "pageNo" : 1,
      "dataType" : "JSON",
      "items" : {
        "item" : [
          {
            "minTa" : "-6.2",
            "n99Rn" : "",
            "avgPa" : "1020.3",
            "maxPs" : "1032.0",
            "sumLrgEv" : "1.5",
            "avgRhm" : "45.3",
            "sumRnDur" : "",
            "avgCm10Te" : "0.6",
            "avgPs" : "1029.2",
            "maxWsWd" : "230",
            "maxTaHrmt" : "1533",
            "hr1MaxRn" : "",
            "avgM10Te" : "5.2",
            "ddMefsHrmt" : "",
            "avgTca" : "0.0",
            "maxPsHrmt" : "2250",
            "maxTa" : "-0.1",
            ...
          }
        ]
      },
      "numOfRows" : 10,
      "totalCount" : 1
    },
    "header" : {
      "resultMsg" : "NORMAL_SERVICE",
      "resultCode" : "00"
    }
  }
})
```

```swift

//  WeatherModel.swift
import Foundation
import SwiftyJSON

// API를 통해 받아올 JSON Data의 Model을 설계
struct WeatherModel {
    
    // RsponseData 전체 가져오기
    struct ResponseData {
        var data : JSON = JSON()
        
        init(data : JSON) {
            self.data = data
        }
    }
    
    // RsponseData 중 원하는 데이터만 가져오기
    struct WeatherData {
        
        var resultMsg : String = ""
        var resultCode : String = ""
        var minTa : String = ""
        var maxTa : String = ""
        
        init() { }
        init(data: JSON) {
            resultMsg = data["response"]["header"]["resultMsg"].stringValue
            resultCode = data["response"]["header"]["resultCode"].stringValue
            minTa = data["response"]["body"]["items"]["item"][0]["minTa"].stringValue
            maxTa = data["response"]["body"]["items"]["item"][0]["maxTa"].stringValue
        }
    }
}
```
  
* minTa와 maxTa는 rseponse 안에 body 안에 items 안에 item 배열 첫번째 칸에 minTa가 있습니다.  
   위처럼 경로를 설정해 주세요 

<div id="subTitle3"></div>

# ✨ **Swift MVVM 패턴 ( View )**
  
이제 Model을 통해 minTa와 maxTa를 가져왔다면 이 데이터들을 View로 보여줄 겁니다.
  
```swift

//  WeatherView.swift
import Foundation
import SwiftyJSON

class WeatherView {
    
    // Model로 받아온 WeatherData의 minTa / maxTa
    var minTaString : String = WeatherModel.WeatherData().minTa
    var maxTaString : String = WeatherModel.WeatherData().maxTa
    
    // 어딘가에서 minTa 변수를 요청 시 minTaString 데이터를 리턴해 줄겁니다. 
    var minTa : String {
        return self.minTaString
    }

    // 어딘가에서 maxTa 변수를 요청 시 maxTaString 데이터를 리턴해 줄겁니다. 
    var maxTa : String {
        return self.maxTaString
    }
}
```
<div id="subTitle4"></div>
  
# ✨ **Swift MVVM 패턴 ( ViewModel )**
  
ViewModel은 Model과 View를 연결해 주는 Controller이기 때문에 순서의 구조를 잘 보시면 됩니다.  

* API를 요청한다.
* 요청한 API의 Response값을 확인해 원하는 값을 Model로 만들어 준다.
* ViewModel로 만들어준 Model 구조에 API Response값을 바인딩 해준다.
* Model 구조에 Response값을 넣어두었으니 View에서 해당 Model의 값을 바라봐준다.
* View에서 특정 값을 ViewModel로 데이터를 가져온다.
  
MVVM 패턴을 하나씩 설명하느라 Model -> View -> ViewModel로 포스팅을 하지만 위처럼 구조를 짜는게 훨씬 쉽습니다.
  
아래는 ViewModel에서 API를 요청하고 값을 View에 넣어두는 메소드 입니다.
  
```swift
//  AppLoadingViewController.swift
func getWeather() {
        
        print("getWeather Call")
        
        var param = Parameters()
        
        param = [
            "serviceKey" : "공공API의 서비스 KEY",
            "numOfRows" : 10,
            "pageNo" : 1,
            "dataType" : "JSON",
            "dataCd" : "ASOS",
            "dateCd" : "DAY",
            "startDt" : 20240115,
            "endDt" : 20240115,
            "stnIds" : 112
        ]
        
        WeatherService().requestGET(url: "http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList", parameter: param, success:  {
            response in
            
            if response.resultCode == "00" {
                let weatherV = WeatherView()
                weatherV.minTaString = response.minTa
                weatherV.maxTaString = response.maxTa
            }
        })
    }
```
<div id="subTitle5"></div>

# ✨ **Swift MVVM 패턴 ( Service )**
  
Service는 ViewModel에서 API를 요청하기 위해 API요청 서비스를 여러곳에서 사용하기 쉽게 모듈화 해 놓은 것입니다.
  
```swift

//  WeatherService.swift
import Foundation
import Alamofire
import SwiftyJSON

class WeatherService {
    
    func requestGET(url : String, parameter : Parameters, success : @escaping(WeatherModel.WeatherData) -> Void) {
        
        let serviceKey = parameter["serviceKey"]!
        let numOfRows = parameter["numOfRows"]!
        let pageNo =  parameter["pageNo"]!
        let dataType = parameter["dataType"]!
        let dataCd = parameter["dataCd"]!
        let dateCd = parameter["dateCd"]!
        let startDt = parameter["startDt"]!
        let endDt = parameter["endDt"]!
        let stnIds = parameter["stnIds"]!
        
        AF.request("\(url)?serviceKey=\(serviceKey)&numOfRows=\(numOfRows)&pageNo=\(pageNo)&dataType=\(dataType)&dataCd=\(dataCd)&dateCd=\(dateCd)&startDt=\(startDt)&endDt=\(endDt)&stnIds=\(stnIds)", 
                   method: .get, parameters: nil, encoding: URLEncoding.default, headers: nil).responseJSON {
            (response) in
            switch response.result {
            case .success(let value) :
                let data = WeatherModel.WeatherData(data: JSON(value))
                success(data)
            case .failure(let error) :
                print(error)
            }
        }
    }
}
```
  
한번 실행해 보겠습니다
  
![image](/assets/WeatherApp.PNG){: width="50%" height="50%"}
  
간단하게 최고기온과 최저기온을 화면에 뿌려봤습니다 ^^ 감사합니다.
  
전체 코드는 Github을 참고해 주세요 >> [YangJinho0217-Github](https://github.com/YangJinho0217/Swift_MVVM_tutorial)