---
layout: post
title : Swift Semaphore + Thread 관리
listTitle: Swift Semaphore + Thread
listSubTitle : 1.Semaphore ?
listSubTitle2 : 2.Semaphore wait 메서드
listSubTitle3 : 3.Semaphore signal 메서드
listSubTitle4 : 4.Semaphore 병렬 쓰레드 응용
tag : [Swift, SwiftUI]
toc : true
---

안녕하세요 Yagsill 입니다.
  
Dispatch Queue Thread의 임계구역 안에서 상태를 제어할 수 있는 방안으로 **NSLock** 이라는 방법이 있었습니다.
  
하지만 Semaphore를 활용한 방법이 있습니다.
  
<div id="subTitle"></div>

# ✨ **Semaphore ?**
  
* 동시에 하나의 자원에 접근을 방지하는 것!
  
Swift에서 활용하는 방법을 설명드리겠습니다.
  
```swift
// 세마포어를 선언하고 value를 통해 허용할 수 있는 개수를 설정한다. 현재는 하나의 접근만 허용함
let semaphore : DispatchSemaphore = DispatchSemaphore(value: 1)
```
  
<div id="subTitle2"></div>

# ✨ **Semaphore wait 메서드**
  
* 세마포어의 접근을 제한하는 함수이다.
  
* .wait()으로 설정해둔 value의 값을 빼기(-) 해버린다.
  
```swift
// wait() 시 설정해둔 value의 값에서 하나를 뺴는것
semaphore.wait()
DispatchQueue.global().async {
    print("/// 임계구역 진입 ///")
}
```
  
<div id="subTitle3"></div>

# ✨ **Semaphore signal 메서드**
  
* 세마포어의 접근을 허용하는 함수이다.
  
* .signal()로 설정해둔 value의 값을 더하는(+) 함수이다.
  
```swift
semaphore.wait()
DispatchQueue.global().async {
    print("/// 임계구역 진입 ///")
    semaphore.signal()
}
```
  
<div id="subTitle4"></div>

# ✨ **Semaphore 병렬 쓰레드 응용**
  
* 여러개의 병렬 쓰레드에서 세마포어를 통해 진입 제한하기
  
```swift
let semaphore : DispatchSemaphore = DispatchSemaphore(value: 3)

semaphore.wait()
DispatchQueue.global().async {
    print("임계구역 진입 A")
    semaphore.signal()

}

semaphore.wait()
DispatchQueue.global().async {
    print("임계구역 진입 B")
    semaphore.signal()
}

semaphore.wait()
DispatchQueue.global().async {
    print("임계구역 진입 C")
    semaphore.signal()
}
// ======= 결과 =====
//임계구역 진입 A
//임계구역 진입 B
//임계구역 진입 C
```
  
이런식으로 Semaphore를 활용할 수 있습니다.
  