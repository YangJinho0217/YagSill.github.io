---
layout: post
title : Swift Dispatch Queue (main, global)
listTitle: Swift Dispatch Queue !
listSubTitle : 1.Dispatch Queue가 뭔데?
listSubTitle2 : 2.Dispatch main queue 사용
listSubTitle3 : 3.Dispatch global queue 사용
listSubTitle4 : 4.Global Queue QOS(우선순위) 부여
tag : [Swift, SwiftUI]
toc : true
---

안녕하세요 Yagsill 입니다.
  
오늘은 Swift의 Thread 특성에 대해서 알아보겠습니다.

<div id="subTitle"></div>
  
# ✨**DispatchQueue**
  
* [tip] DispatchQueue는 FIFO 큐 입니다. 즉 **먼저 들어가면 먼저 나온다.**
  
* [tip] DispatchQueue는 직렬(Serial) / 병렬(Concurrent) 특징을 갖고 있습니다.
  
* [tip] DispatchQueue는 동기성과 비동기성의 특징을 갖고 있습니다.
  
* [tip] UI의 모든 요소는 Main Thread에서 수행되어야 합니다.

<div id="subTitle2"></div>

# ✨**DispatchQueue 사용 방법**
  
```swift
DispatcheQueue.main.sync {
    for var i in 0...5 {
        print("\(i)")
    }
}
print("100")
```

```swift
// 결과는 항상 같음
0
1
2
3
4
5
100
```
  
* 설명 : Main Thread에서 동기(sync)적으로 수행하는 방식
  
* 동기(sync)적으로 수행 시 DispatchQueue.main.sync 내 임계구역에서의 코드를 처리할 때 까지 기다렸다가 처리.
  
```swift
DispatcheQueue.main.async {
    for var i in 0...5 {
        print("\(i)")
    }
}
print("100")
```

```swift
// 매번 결과가 다르게 나옴
100
0
1
2
3
4
5
```
  
* 설명 : Main Thread에서 비동기(async)적으로 수행하는 방식
  
* 비동기(async)적으로 수행 시 DispatchQueue.main.sync 내 임계구역에서의 코드를 처리할 때 까지 기다리지 않고 처리
  
<div id="subTitle3"></div>

# ✨**DispatchQueue Global Queue**
  
* global queue는 concurrent의 특성이 있습니다. 동시에 병렬적으로 task를 실행합니다.
  
```swift
DispatchQueue.global().sync {
    for var i in 0...5 {
        print("\(i)")
    }
}
print("100")

DispatchQueue.global().sync {
    for var i in 0...5 {
        print("\(i)")
    }
}
print("200")
```

```swift
// 결과는 항상 같음
0
1
2
3
4
5
100
0
1
2
3
4
5
200
```
  
* 설명 : global Thread에서 동기(sync)적으로 수행하는 방식
  
* 동기(sync)적으로 수행 시 DispatchQueue.global().sync 내 임계구역에서의 코드를 처리할 때 까지 기다렸다가 처리.
  
* global() queue라도 sync의 동기적 특성으로 task를 실행하게 되면 순차적으로 처리가 됩니다.
  
```swift
DispatchQueue.global().async {
    for var i in 0...5 {
        print("\(i)")
    }
}
print("100")

DispatchQueue.global().async {
    for var i in 0...5 {
        print("\(i)")
    }
}
print("200")
```

```swift
// 매번 결과가 다르게 나옴
100
200
0
1
0
2
3
1
4
5
2
3
4
5
```
  
* 설명 : global Thread에서 비동기(async)적으로 수행하는 방식
  
* 비동기(async)적으로 수행 시 DispatchQueue.global().async 내 임계구역에서의 코드를 처리할 때 까지 기다리지 않고 처리.
  
* global() queue에서 비동기(async)로 처리하기 때문에 두개의 queue가 병렬적으로 처리가 됩니다.
  
<div id="subTitle4"></div>

# ✨**Global Queue QOS(우선순위)**
  
* 병렬적으로 처리하되 큐에 우선순위를 부여해 우선순위가 높은 task부터 처리하는 방식입니다.
  
* 우선순위는 **userInteractive**, **userInitiated**, **default**, **utility** ,**background**, **unspecified** 가 있습니다.
  
* 자세한 사항은 해당 문서를 확인해 보세요! **[[developer.appple.com qos Class]](https://developer.apple.com/documentation/dispatch/dispatchqos/qosclass){:target="_blank"}**
  
![image](/assets/SwiftqosClass.png)
  
```swift
DispatchQueue.global(qos: .userInteractive).async {
    print("A")
}

DispatchQueue.global(qos: .userInitiated).async {
    print("B")
}

DispatchQueue.global(qos: .default).async {
    print("C")
}

DispatchQueue.global(qos: .utility).async {
    print("D")
}

DispatchQueue.global(qos: .background).async {
    print("E")
}

DispatchQueue.global(qos: .unspecified).async {
    print("F")
}
```

```swift
A
B
C
F
D
E
```
  
* DispatcheQueue의 순서를 바꿔도 결과는 같습니다.
  
* 순서도로 보면 왼쪽부터 높은 우선순위를 갖습니다.
  
* userInteractive > userInitiated > default > unspecified > utility > background
  
감사합니다.