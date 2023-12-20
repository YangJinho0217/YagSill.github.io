---
layout: post
title : Swift UserDefaults로 데이터 저장하기
tag : [Swift, SwiftUI]
---
  
Swift에서는 메모리에 값을 저장하는 기능을 갖고 있습니다. UserDefaults <<!
  
기본적인 형태는 이렇습니다.
```swift
// 데이터를 저장하는 방식
UserDefaults.standard.set("airPods", forKey: "yagsill")
// 데이터를 불러오는 방식
UserDefaults.standard.object(forKey: "yagsill")
```
  
이렇게 UserDefaults에 저장을 하게 됩니다.
  
물론 삭제도 가능합니다.
  
```swift
UserDefaults.standard.removeObject(forKey: "yagsill")
```
  
감사합니다.
  