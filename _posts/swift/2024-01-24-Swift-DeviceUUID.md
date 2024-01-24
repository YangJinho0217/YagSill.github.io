---
layout: post
title : Swift APNs 토큰 vs TAKUUID
listTitle: Swift Semaphore + Thread
listSubTitle : 1.두가지로 디바이스의 고유한 ID를 확인
listSubTitle2 : 2.APNs Device Token
listSubTitle3 : 3.TAKUUID Device UUID
tag : [Swift, SwiftUI]
toc : true
---
  
안녕하세요 Yagsill 입니다.
  
Swift에서 IOS 디바이스의 고유한 ID를 찾는 방법을 설명 드리겠습니다.
  
<div id="subTitle"></div>

두가지로 디바이스의 고유한 ID를 확인하는 방법
  
* **APNs Device Token**
  
* **TAKUUID Device UUID**
  
<div id="subTitle2"></div>

# ✨ **APNs Device Token**
  
공식 문서에 따르면 **Apple Push Notification server**의 약자로 애플의 서버를 의미합니다.
  
APN에 앱을 등록하고 전역적으로 고유한 장치 토큰을 받습니다.

* 첫번째로 **Xcode > Targets > Signing&Capabilities > 상단 +버튼으로 Push Notifications를 추가**
  
![image](/assets/Apns.png)
  
* 두번째로 **AppDelegate 코드작성**
  
```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let tokenStr = deviceToken.reduce("", {$0 + String(format: "%02X", $1)})
    print("APNs token retrieved: \(tokenStr)")
}
```
  
![image](/assets/ApnsToken.png)
  
디바이스 토큰을 확인할 수 있습니다.
  
* <span style="color : red">문제점 : 고유한 값으로 사용하기 위해서는 APNs토큰은 앱을 재설치 시 APNs의 토큰값이 변경되기때문에 뭔가 유니크하다고 볼 수 없다고 느꼈습니다.<span>
  
그래서 TAKUUID를 이용해 고유한 UUID를 이용하는것이 조금 더 유니크한 방법인 것 같습니다.
  
<div id="subTitle3"></div>

# ✨ **TAKUUID Device UUID**
  
TAKUUID는 Swift의 라이브러리 입니다. 공식 Github의 내용을 일부 다룹니다. 공식 Github => [TAKUUID](https://github.com/taka0125/TAKUUID)
  
* 첫번째로 **라이브러리를 install 해줍니다.**
  
```linux
pod 'TAKUUID'
or
pod 'TAKUUID', :git => 'https://github.com/taka0125/TAKUUID.git'
```
  
* 두번쨰로 사용할 부분에서 **import 해줍니다.**
  
```swift
import TAKUUID
```
  
* 세번쨰로 **Xcode내 Capability에 KeyChain을 추가해줍니다**
  
![image](/assets/keychain.png)
  
* 네번쨰로 UUID를 생성하고 출력해 보면 됩니다.
  
```swift
func initUUID() {
    TAKUUIDStorage.sharedInstance().migrate()
    if let userUUID : String = TAKUUIDStorage.sharedInstance().findOrCreate() {
        
        print("UUID 확인 : \(userUUID)")
        
        // 하이픈(-) 제거 방법
        let replaceId = userUUID.components(separatedBy: "-")
        var resultId : [String] = [""]
        for i in 0...replaceId.count - 1 {
            resultId[0].append(replaceId[i])
        }
        
        print("UUID 확인 : \(resultId[0])")
    }
}
```
  
결과를 확인해 봅시다.
  
![image](/assets/KeyChainResult.png)
  
* UUID의 값은 확률적으로는 **로또맞을 확률**로 중복이 될 가능성이 있다고 합니다.
  
* 만약 중복되면 당신은 로또에 맞은것과 다름없으니 로또를 사보는건 어떨까요?
  
감사합니다.
