---
title: CSS-排版
date: 2020-05-30 18:45:04
tags: 
- CSS
categories:
- CSS
description:
- CSS 选择器
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

### 正常流的三大难题
- overflow:visible 与 BFC
- margin collapse
- float 与 clear

## Flex

### Flex 排版
- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布




## 写在后面
- 祝大家多多发财
