---
layout: post
title : Swift GCD + NSLock으로 접근제어하기
listTitle: Swift GCD와 NSLock
listSubTitle : 1.GCD(Grand Central Dispatch)
listSubTitle2 : 2.NSLock lock() 사용법
listSubTitle3 : 3.NSLock unlock() 사용법
listSubTitle4 : 4.unlock() Error
listSubTitle5 : 4.unlock() 응용하기!
tag : [Swift, SwiftUI]
toc : true
---

안녕하세요 Yagsill 입니다.
  
저번 포스팅에 이어 Thread 처리시 중요한 접근제어에 대해서 다뤄보겠습니다.

<div id="subTitle"></div>
  
# ✨ **GCD(Grand Central Dispatch)**
  
Swift에서는 Thread에 접근할 때 **알아서 OS가 처리**해 주기 때문에 GCD Thread를 사용하면 됩니다.
  
즉 queue에 넣어주기만 하면<span style="background-color: #fff5b1; color : #2D3748;"><strong> 알아서 Thread를 실행하고 제거</strong></span>해 줍니다.
  
### **그러나 우리는 NSLock을 사용할 순간이 온다는것!**

<div id="subTitle2"></div>
  
# ✨ **NSLock lock() 사용법**
  
* queue에 계속해서 task를 할당해야 하고 타이밍에 맞지 않아 실행중인 Theead에 계속해서 task를 요청하게 되면 **deadLock(교착상태)** 에 걸리게 됩니다.
  
* NSLock을 통해 Thread에 task 요청을 할 수 없게 만들면 됩니다. 그게 바로 NSLock입니다

```swift
let lock = NSLock()
```
  
NSLcok Class를 선언해 주고 lock을 임계구역 안에서 사용할겁니다.
  
```swift
DispatchQueue.global().async {
    lock.lock()
}
```
  
* 현재 병렬적으로 실행되는 Thread에 lock을 걸었습니다. 그러면 다시 이 Thread에 요청을 할 수 없습니다.
  
* unlock() 으로 풀어주면 됩니다.
  
* unlock() 을 실행하지 않을 시 이 Thread는 계속 rock이 걸린 상태입니다.

<div id="subTitle3"></div>
  
# ✨ **NSLock unlock() 사용법**
  
```swift
DispatchQueue.global().async{
    lock.lock()
    lock.unlock()
}
```

* **주의 : unlock()은 무조건 임계구역안에서 구현해야합니다**  
  
* **주의 : unlock()은 무조건 lock을 걸어놓은 쓰레드에서 실행되어야 합니다** 

<div id="subTitle4"></div>
  
#### 🚫 **올바르지 않은 unlock() 사용**
  
```swift
DispatchQueue.global().async{
    lock.lock()
    DispatchQueue.main.async {
        lock.unlock() // 실행되는 Thread가 lock()을 사용한 Thread와 다르기 때문에 ERROR!
    }
}
```
  
#### 👍🏻 **올바른 unlock() 사용**
  
```swift
DispatchQueue.global().async{
    lock.lock()
    DispatchQueue.main.async {
        print("HI Swift")
    }
    lock.unlock()
}
```

<div id="subTitle5"></div>
  
# ✨ **NSLock lock() 응용**
  
여러개의 lock을 선언해두고 개별적으로 사용해도 됩니다.
  
```swift
let typeA = NSLock()
let typeB = NSLock()
```
  
* 두개의 NSLock 선언 후 사용
  
```swift
DispatchQueue.global().async {
    typaA.lock()
    print("A")
    print("B")
    typaA.unlock()
}

DispatchQueue.global().async {
    typaB.lock()
    print("C")
    print("D")
    typaB.unlock()
}
```
  
감사합니다.