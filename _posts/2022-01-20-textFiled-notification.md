---
layout: post
title : Swift TextField 키보드 감지 하기(NotificationCenter)
tag : [Swift, SwiftUI]
toc : true
---
  
Swift TextField 키보드 감지 하기(NotificationCenter)
  
별거 없습니다 그냥 코드만 추가하면 됩니다.

```swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    // 키보드가 올라갔다는 것을 감지하는 것.
    NotificationCenter.default.addObserver(self, selector: #selector(함수이름(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
    // 키보드가 내려갔다는 것을 감지하는 것.
    NotificationCenter.default.addObserver(self, selector: #selector(함수이름(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
}
```
-> 이렇게 addObserver를 통해 NotificationCenter를 감지를 할 수 있습니다.
  
-> 우리는 이 Notification을 중복되서 사용하지 않게 제거해 주어야 합니다.

```swift
override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    //Notification 제거
    NotificationCenter.default.removeObserver(self, name: UIResponder.keyboardWillShowNotification, object: nil)
    NotificationCenter.default.removeObserver(self, name: UIResponder.keyboardWillHideNotification, object: nil)
}
```
키보드를 올리고 내리고 해보죠

```swift
@objc func keyboardWillShow(notification : NSNotification) {
    print("-----> keyboardWillShow() 호출")
}

@objc func keyboardWillHide(notification : NSNotification) {
    print("-----> keyboardWillHide() 호출")
    
}
```