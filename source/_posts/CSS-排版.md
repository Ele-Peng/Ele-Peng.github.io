---
title: CSS-排版
date: 2020-05-30 18:45:04
tags: 
- CSS
categories:
- CSS
description:
- CSS 排版
---


## 写在前面
- CSS 排版相关知识
- CSS 属性
	- 排版
	- 渲染
	- 交互

<!-- more -->

## 盒（Box）
- 源代码 - 标签 - tag
- 语义 - 元素 - element
- 表现 - 盒 - box
- 基本元素 盒 + 文字
- 排版和渲染的基本单位是盒
- CSS 在排版时可能产生多个盒

## 盒模型
- 【未完】box-sizing: 为什么没有 margin-box
- ![盒模型](http://p0.meituan.net/myvideodistribute/1ed695c617e6c1ac8ba2b6650d5bb2c5220253.png)

## 正常流


### 正常流排版


### 正常流的行模型

```html
<div style="font-size:50px;line-height:100px;background-color:pink;">
	Hello
    <div style="line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block">world!</div>
</div>
```
- 运行截图
	- ![运行截图](http://p0.meituan.net/myvideodistribute/2e8597eb317b1096396a1b7ebfa335bb188008.png)
- 发现，即使行高不一致， Hello 与 world！ 也基于 baseline 对齐


```html
<div style="font-size:50px;line-height:100px;background-color:pink;">
	Hello
    <div style="line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block"></div>
</div>
```
- 运行截图
	- ![运行截图](http://p0.meituan.net/myvideodistribute/cdac1ebe861651fc773f462496bcaa58175250.png)
- 发现，当没有内容时，使用盒子 bottom 对齐 文字 baseline
- 所以一般要给盒子设置 vertical-align: bottom / top

```html
<div style="font-size:50px;line-height:100px;background-color:pink;">
  <!-- <div style="vertical-align:baseline;overflow:visible;display: inline-block;width:1px;;height:1px;background:red;">
    <div style="width:1000px;;height:1px;background:red;"></div>
  </div> -->
	Hello
  <div style="vertical-align:bottom;line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block"></div>
  <div style="vertical-align:top;line-height:70px;width:100px;height:50px;background-color:aqua;display:inline-block"></div>
  <div style="vertical-align:bottom;line-height:70px;width:100px;height:200px;background-color:plum;display:inline-block"></div>
</div>
```
- 运行截图
	- ![运行截图](http://p0.meituan.net/myvideodistribute/368d5d1389c38ac68370ed80b6f22cf4231244.png)
- 可以发现 vertical-aign 与 line-height 高度设定无关，与最终被撑开的盒子高度有关
- 没有设定 vertical-align 如果超过 line-height 始终与最高元素的对齐方式保持一致


```javascript
<div style="font-size:50px;line-height:100px;background-color:pink;">
  <div style="vertical-align:text-bottom;overflow:visible;display:inline-block;width:1px;height:1px;background:red;">
    <div style="width:1000px;;height:1px;background:red;"></div>
  </div>
  <div style="vertical-align:text-top;overflow:visible;display:inline-block;width:1px;height:1px;background:red;">
    <div style="width:1000px;;height:1px;background:red;"></div>
  </div>
	Hello
  <div style="vertical-align:text-top;line-height:70px;width:100px;height:50px;background-color:aqua;display:inline-block"></div>
  <div style="vertical-align:text-top;line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block"></div>
  <div style="vertical-align:text-bottom;line-height:70px;width:100px;height:200px;background-color:plum;display:inline-block"></div>
</div>
```
- 运行截图
	- ![运行截图](http://p0.meituan.net/myvideodistribute/9b109f5fd664383e3df90e99684c3e44251251.png)
- 当我们把 vertical-align 设置成 text-top / text-bottom 我们可以发现，上边缘是由 text-top 元素撑开，下边缘是由 text-bottom 元素撑开的
- 正常流交叉轴的 crossBase = 上边缘 + 下边缘 - text高度
- vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline 
- vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“ 
- vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 
- 结论：**正常流的行模型推荐 vertical-align: top/bottom/middle**



### 正常流的三大难题
- overflow:visible 与 BFC
- margin collapse
	- [W3 BFC](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)
	- ![BFC conception](http://p0.meituan.net/myvideodistribute/fb01ede731f8f6ceb2f700f2b73cf681228107.png)
	- ![BFC margin collapse](http://p0.meituan.net/myvideodistribute/9e455229b4b2a2214199f9754a4b022c290880.png)
		- 我们可以看到在 BFC 中 发生了 margin collapse
	- ![new BFC margin collapse](http://p0.meituan.net/myvideodistribute/77ea7124c4f4e610b397483990fd009c222906.png)
		- 在这里，我们将 4、5 用一个 div 框起来，设置 overflow other than visible 在新的 div 里形成一个新的 BFC
		- BFC 与 BFC 之间不发生 margin collapse
	- ![BFC V3](http://p1.meituan.net/myvideodistribute/b85b5b56118aaa06c6c1eb1d67d1d565238437.png)
		- 我们在 div 里新建的 BFC ,里面发生 margin collapse，margin-top: 20px;
		- div 所处外面同一级 BFC ，也发生 margin collapse， 变成 50px;
	- ![BFC V4](http://p0.meituan.net/myvideodistribute/a7eb565313d603a0440434d2c3aaed71220282.png)
		- 将 overflow: visible 后，整个 div 就像不存在一样，没有影响，产生 margin collaps
	- ![BFC V5](http://p1.meituan.net/myvideodistribute/ce562c00cac00a70bfa7ea23851785d2234933.png)
		- 但我们增加 margin-top: 50px 后，奇怪的事情发生了
	- **overflow: visible 是特例，里面是 block, 外面也是 block, 会合并成一个 block**
	- **Block-level boxes that are also block containers are called block boxes.**
		- flex inline-flex
		- table inline-table
		- grid inline-grid
		- block inlie-block
		- **block containers: block inlie-block**
		- **Block-level boxes: flex table grid block**
		- 只要包含正常流，都会产生 BFC, 剩下的都是由一些奇怪的 display, 最子一级元素也会产生 BFC ，like flex-item table-cell

- float 与 clear

## Flex

### Flex 排版
- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布




## 写在后面
- 祝大家多多发财
