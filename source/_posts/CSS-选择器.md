---
title: CSS-选择器
date: 2020-05-29 16:19:40
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
- CSS 选择器相关知识

<!-- more -->


## 选择器语法

### 简单选择器
- *
- div svg|a
	- [SVG](http://www.w3.org/2000/svg)

		```html
		<!DOCTYPE html>
		<html>
		<head>
		  <meta charset="utf-8">
		  <title>JS Bin</title>
		</head>
		<body>
		<svg width="100" height="28" viewBox="0 0 100 28" version="1.1"
		     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		  <desc>Example link01 - a link on an ellipse
		  </desc>
		  <a xlink:href="http://www.w3.org">
		    <text y="100%">name</text>
		  </a>
		</svg>
		<br/>
		<a href="javascript:void 0;">name</a>
		</body>
		</html>
		```
		```CSS
		@namespace svg url(http://www.w3.org/2000/svg);
		@namespace html url(http://www.w3.org/1999/xhtml);
		svg|a {
		  stroke:blue;
		  stroke-width:1;
		}
		
		html|a {
		  font-size:40px
		}
		```
- .cls
- \#id
- [attr=value]
	- 【未完】编写测试用例
	- [attr]
		- 直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中
	- [attr=val]
		- 精确匹配，检查一个元素属性的值是否是 val
	- [att~=val]
		- 多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列
	- [att|=val]
		- 开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管
- :hover
- ::before


### 复合选择器
- &lt;简单选择器&gt;&lt;简单选择器&gt;&lt;简单选择器&gt;
- * 或者 div 必须写在最前面

### 复杂选择器
- &lt;复合选择器&gt;&lt;sp&gt;&lt;复合选择器&gt;
  - 子孙
	- 后代，表示选中所有符合条件的后代节点
- &lt;复合选择器&gt;">"&lt;复合选择器&gt;
	- 子选择器，只能选择子一级
	- 子代，表示选中符合条件的子节点
- &lt;复合选择器&gt;"~"&lt;复合选择器&gt;
	- sibling
	- 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点
- &lt;复合选择器&gt;"+"&lt;复合选择器&gt;
	- sibling
	- 直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling
- &lt;复合选择器&gt;"||"&lt;复合选择器&gt;
	- selectors-4
	- table 里选中一列
	- 列选择器，表示选中对应列中符合条件的单元格
	
### 选择器列表
- 以 comma 分隔的复杂选择器序列

## 选择器优先级
- [图解 css-specificity](http://www.standardista.com/css3/css-specificity/)
- [w3 css-specificity](https://www.w3.org/TR/2018/WD-selectors-4-20181121/#specificity-rules)
- [MDN css-specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

## 伪类
### 链接/行为
- :any-link
- :link :visited
- :hover
- :active
- :focus
- :target

### 树结构
- :empty
- :nth-child()
	- ![:nth-child An+B](http://p0.meituan.net/myvideodistribute/75fe112b20e952564395fc869bf398d694743.png)
- :nth-last-child()
- :first-child :last-child :only-child

### 逻辑型
- :not 伪类
- :where :has

## 伪元素
- ::before
- ::after
- ::first-line
	- 元素的第一行
- ::first-letter
	- 元素的第一个字母



## 写在后面
- 祝大家多多发财
