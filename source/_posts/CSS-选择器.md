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


## 选择器语法

### 简单选择器
- *
- div svg|a
- .cls
- \#id
- [attr=value]
- :hover
- ::before


### 复合选择器
- &lt;简单选择器&gt;&lt;简单选择器&gt;&lt;简单选择器&gt;
- * 或者 div 必须写在最前面

### 复杂选择器
- &lt;复合选择器&gt;&lt;sp&gt;&lt;复合选择器&gt;
	- 子孙
- &lt;复合选择器&gt;">"&lt;复合选择器&gt;
	- 子选择器，只能选择子一级
- &lt;复合选择器&gt;"~"&lt;复合选择器&gt;
	- sibling
- &lt;复合选择器&gt;"+"&lt;复合选择器&gt;
	- sibling
- &lt;复合选择器&gt;"||"&lt;复合选择器&gt;
	- selectors-4
	- table 里选中一列
	
### 选择器列表
- 以 comma 分隔的多个选择器

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
- :nth-last-child()
- :first-child :last-child :only-child

### 逻辑型
- :not 伪类
- :where :has

## 伪元素
- ::before
- ::after
- ::first-line
- ::first-letter



## 写在后面
- 祝大家多多发财
