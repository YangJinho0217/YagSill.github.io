---
layout: post
title : Swift WKWebView 새창 열기
tag : [Swift, SwiftUI]
---
  
오늘은 WKWebView를 활용해서 새창을 여는 방법을 소개해 드리겠습니다.
  
```swift
var popupView : WKWebView?
```
```swift
func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction:
    WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {

        popupView = WKWebView(frame: webview.frame, configuration: configuration)
        popupView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        popupView?.uiDelegate = self
        
        view.addSubview(popupView!)
        
        Log.print(pageIndex)
        
        Log.print("popupView 호출 완료")
        
        return popupView
        
}
```

새창을 열었을 때 뒤로가기가 안되는 문제가 생깁니다.
  
예를들어 네이버 고객센터화면에서 뒤로가기할 때 뷰 자체가 닫히는 이슈가 있습니다. 그래서 WKWebView는 canGoBack과 goback() 함수를 이용합니다.
```swift
if self.popupView?.canGoBack != nil {
    self.popupView?.goBack()
    if self.popupView?.goBack() == nil {
        // 로직 처리
    }
} else {
    // 로직 처리
}
```

감사합니다.
  