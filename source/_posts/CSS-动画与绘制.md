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
- animation-delay: 动画开始前的延迟
- animation-iteration-count: 动画的播放次数
- animation-direction: 动画方向





## 动画与绘制



## 渲染与颜色
- data uri svg




## 写在后面
- 祝大家多多发财
