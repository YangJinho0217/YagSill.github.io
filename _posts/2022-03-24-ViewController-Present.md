---
layout: post
title : Swift ViewController present 데이터전달 방법
tag : [Swift, SwiftUI]
---
  
Swift ViewController present 데이터전달 방법
  
다른 ViewController로 데이터를 전달해 보겠습니다.
```swift
let sb = UIStoryboard(name : "스토리보드이름", bundle : nil)
let vc = let vc = sb.instantiateViewController(withIdentifier: "스토리보드의 identity") as! firstViewController // firstViewController는 ViewController이름입니다.
// vc. 을 하게되면 해당 뷰컨트롤러 안에 변수들에 접근이 가능합니다.
// 그러나 present를 해주지 않으면 데이터가 전달되지 않기 때문에 해당 뷰컨트롤러의 변수값을 변경하기 위해서는 꼭 present가 필요합니다.
// vc.sampleData = 1
// vc.sampleData2 = 2
// vc.sampleData3 = 3
// vc.sampleData4 = "텍스트"
self.present(vc, animation : false)
```

감사합니다.
  