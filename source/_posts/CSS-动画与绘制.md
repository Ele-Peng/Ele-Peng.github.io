---
title: CSS-动画与绘制
date: 2020-06-06 17:07:06
tags: 
- CSS
categories:
- CSS
description:
- CSS 选择器
---


<style  type="text/css">
.lx-entry a {
    color: #191919;
    padding: 2px 0 1px 0;
    text-decoration: none;
    background-image: linear-gradient( transparent 0%, transparent calc(50% - 9px), rgba(247,65,65,.761) calc(50% - 9px), rgba(247,65,65,.761) 100% );
    transition: background-position 120ms ease-in-out, padding 120ms ease-in-out;
    background-size: 100% 200%;
    background-position: 0 0;
    word-break: break-word;
}

.lx-entry a:hover {
  background-image: linear-gradient( transparent 0%, transparent calc(50% - 9px), rgba(247,65,65,.761) calc(50% - 9px), rgba(247,65,65,.761) 100% );
  background-position: 0 100%;
}

.post-button a:hover {
  background-image: linear-gradient( transparent 0%, transparent calc(50% - 9px), transparent calc(50% - 9px), transparent 100% ) !important;
  background-position: 0 100% !important;
  outline: none !important;
  text-decoration: none !important;
}
</style>



## 写在前面
- CSS 动画与绘制
- 3个小时的舞跳下来，这周竟然还不累？好吧，其实是我中间划水了 🙃
- 以后周六早课，一定要在8点前享受完早餐！今早跳舞低血糖，双耳一直耳鸣





## 动画与绘制


## Animation
- @keyframes 定义
- animation: 使用

	```javascript
	@keyframes mykf {
	  from {background: red;}
	  to {background: yellow;}
	}
	
	div {
	  width: 100px;
	  height: 100px;
	  animation: mykf 5s infinite;
	}
	```
	
### Animation Shortcut
- animation-name: 时间曲线
- animation-duration: 动画时长
- animation-timing-function: 动画的时间曲线
	- [cubic-bezier 效果](https://cubic-bezier.com/#.17,.67,.83,.67)
	- [wiki cubic-bezier](https://zh.wikipedia.org/wiki/%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A)
- animation-delay: 动画开始前的延迟
- animation-iteration-count: 动画的播放次数
	- &lt;single-animation-iteration-count&gt; = infinite | &lt;number&gt;
- animation-direction: 动画方向
	- &lt;single-animation-direction&gt; = normal | reverse | alternate | alternate-reverse

	

```css
/* @keyframes duration | timing-function | delay | 
iteration-count | direction | fill-mode | play-state | name */
animation: 3s ease-in 1s 2 reverse both paused slidein;
	
/* @keyframes name | duration | timing-function | delay */
animation: 3s linear 1s slidein;
	
/* @keyframes name | duration */
animation: slidein 3s;
```
- [MDN CSS animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

### 贝瑟尔曲线拟合
- [demo]()


## Transition
### Transition Shortcut
- transition-property: 要变换的属性
- transition-duration: 变换的时长
- transition-timing-function: 时间曲线
- transition-delay: 延迟

```css
/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | timing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* Apply to 2 properties */
transition: margin-right 4s, color 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out;

/* Global values */
transition: inherit;
transition: initial;
transition: unset;
```
- [MDN CSS transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)



## 渲染与颜色

### 颜色
#### CMYK 与 RGB
#### HSL 与 HSV
- Hue 色相(360度) Saturaiotn 饱和度、纯度 Lightness 明度
	- 补色，对角色 --> Hue + 180
- Hue Saturation Value

### 形状
- border
- box-shadow
- border-radius

#### data uri + svg
- encodeUriComponent

```
data:image/svg+xml,%3csvg%20width=%22100%25%22%20height=%22100%25%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%3e%3cellipse%20cx=%22300%22%20cy=%22150%22%20rx=%22200%22%20ry=%2280%22%20style=%22fill:rgb(200,100,50);%20stroke:rgb(0,0,100);stroke-width:2%22/%3e%20%3c/svg%3e
```





## 写在后面
- 祝大家多多发财
