---
title: Toy-Browser-DAY5
date: 2020-05-24 17:21:06
tags:
- 浏览器
categories:
- 浏览器
description:
- 浏览器 -- toy-browser
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
- implementation of a toy-browser 🙆
- 最末篇：浏览器的绘制，完结 toy-browser ✊
- ![DOM with Position](http://p0.meituan.net/myvideodistribute/5c3903a71266e72d2e3f21a276c0efad94997.png)

<!-- more -->

## 第一步：绘制单个元素
- 绘制需要依赖一个图形环境
- 这里采用 npm package -- images
- 绘制先在一个 viewport 上进行
- 暂时只处理绘制属性：background-color
- render1.js

	```javascript
	const images = require('images')

	function render(viewport, element) {
	  if (element.style) {
	    const img = images(element.style.width, element.style.height)
	
	    if (element.style["background-color"]) {
	      let color = element.style["background-color"] || "rgb(0,0,0)"
	      color.match(/rgb\((\d+),(\d+),(\d+)\)/)
	      // .fill(red, green, blue[, alpha])
	      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1)
	      viewport.draw(img, element.style.left || 0, element.style.top || 0)
	    }
	  }
	}
	
	module.exports = render
	```
	
- client.js
	
	```javascript
	
	// ... some code
	
	void async function () {
	
	  // ... some code
		
	  let dom = parser.parseHTML(response.body)
	
	  let viewport = images(800, 600)
	
	  // 绘制 cls1 元素点，rgb(0, 255, 0)
	  render(viewport, dom.children[0].children[3].children[1].children[3])
	
	  viewport.save("viewport.jpg")
	}()
	```
	
- 运行结果
	- ![运行结果](http://p0.meituan.net/myvideodistribute/c8641c2200150079f9f29c91b1102ac83945.png)

- [render1.js 完整代码-点击一下](https://github.com/Ele-Peng/toy-browser/blob/master/render1.js)

## 第二步：绘制 DOM
- 递归调用子元素的绘制方法完成 DOM 树的构建
- render2.js

	```javascript
	const images = require('images')

	function render(viewport, element) {
	  if (element.style) {
	    
	    // some code
	    
	  }
	
	  if (element.children) {
	    for (let child of element.children) {
	      render(viewport, child)
	    }
	  }
	  
	}
	
	module.exports = render
	```
- 忽略一些不需要绘制的节点
- 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
- 实际浏览器中，还会对一些图层做 compositing，这里忽略
- server.js 将response Content-Type 设置为 text/html

	```javascript
	
	// some code
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
	
	// some code
	```
	
- 运行结果
	- ![运行结果](http://p0.meituan.net/myvideodistribute/b04d62bb5f32ee07cb640e0b97014fb147655.png)

	
- [render2.js 完整代码 点击一下](https://github.com/Ele-Peng/toy-browser/blob/master/render2.js)


## 写在后面
- [toy-browser 完整代码 点击一下](https://github.com/Ele-Peng/toy-browser)
- 祝大家多多发财

