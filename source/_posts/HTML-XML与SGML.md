---
title: HTML-XML与SGML
date: 2020-06-06 19:09:37
tags: 
- HTML
categories:
- HTML
description:
- HTML
---


## 写在前面
- 永远不要再鸽，是不可能的
- 补到第二天的 12:37

## HTML 的定义：XML 与 SGML

### DTD 与 XML namespace
- [https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd](https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)
	- [https://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent](https://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent)
		- \&nbsp; \u00A0 " " (no-break space = non-breaking space)
		- \<!ENTITY nbsp    "\&#160;"\> \<!-- no-break space = non-breaking space, U+00A0 ISOnum --\>
	- [https://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent](https://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent)
	- [https://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent](https://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent)
		- html 属性中不能使用 \", 需要转义
			- \<!ENTITY quot    "\&#34;"\> \<!--  quotation mark, U+0022 ISOnum --\> \"
		- html 中不能使用 \&, 需要转义
			- \<!ENTITY amp    "\&#38;#38;"\> \<!--  ampersand, U+0026 ISOnum --\> \&
		- html 中不能使用 \<, 需要转义
			- \<!ENTITY lt    "\&#38;#60;"\> \<!--  less-than sign, U+003C ISOnum --\> \<
		- html 中不能使用 \>, 需要转义
			- <\!ENTITY gt    "\&#62;"\> \<!--  greater-than sign, U+003E ISOnum --\> \>
- [http://www.w3.org/1999/xhtml](http://www.w3.org/1999/xhtml)




## HTML 标签 - 语义
### 为 wiki 编写 HTML
- [示例 wiki](http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html)


## HTML - 语法
### 合法元素
- Element: &lt;tagname&gt;...&lt;/tagname&gt;
- Text: text
- Comment: \<!-- comments --\>
- DocumentType: <!Doctype html>
- ProcessingInstruction: <?a 1?> 
	- 预处理
- CDATA: <![CDATA[]]>

### 字符引用
- \&\#160; \&nbsp;
- \&amp;
- \&lt;
- \&gt;
- \&quot;



## DOM

### 导航类操作
- parentNode
- childNodes
	- living collection 会被实时修改
- firstChild
- lastChild
- nextSibling
- previousSibling



### 修改操作
- 所有的 DOM 默认有且只有一个父元素
	- 不能被两次插入 DOM 树中。
	- 将一个 DOM 元素，插入到 a 位置，再调用插入到 b 位置，会默认的先从 a 位置 remove 出来
	- 【未完实例】
- appendChild
- insertBefore
- removeChild
- replaceChild

### 高级操作
- compareDocumentPosition 是一个用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际上在 JS 中可以用 ===
- cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝



## Event: 冒泡与捕获
- [addEventListener MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)


## Range API
#### 把一个元素的所有子元素逆序

### Range 用法
- var range = new Range()
- range.setStart(element, 9)
- range.setEnd(element, 4)
- var range = document.getSelection().getRangeAt(0)
- var fragment = range.extractContents()
- range.insertNode(document.createTextNode("aaa"))

### Range API
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents
- 结论：range 更为精细操作 DOM，批量操作 DOM


## CSSOM
### document.styleSheets
- document.styleSheets
- 案例


### Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p{color: pink;}", 0)
- document.styleSheets[0].removeRule(0)

### Rule
- CSSStyleRule
	- selectorText String
	- style k-v 结构
- CSSCharsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSNamespaceRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSupportRule
- ...


### getComputedStyle
- window.getComputedStyle(elt, pseudoElt)
	- elt 想要获取的元素
	- pseudoElt 可选，伪元素

### CSSOM View


```javascript
let childWindow = window.open("about:blank", "_blank")

let childWindow = window.open("about:blank", "_blank", "width=100,height=100,left=100,top=100")

childWindow.moveBy(-50, -50)

childWindow.resizeBy(50, 50)

window.scroll(0, 0)

window.scroll(0, 50) // 滚动至 (0, 50)

window.scrollBy(0, 50) // 滚动绝对值

getClientRects() // 伪元素不会被计入

getBoundingClientRect()

window.innerHeight
// 等同于 document.documentElement.getBoundingClientRect().height

window.innerWidth
// 等同于 document.documentElement.getBoundingClientRect().width

window.outerHeight

window.outerWidth

window.devicePixelRatio
```



## 所有 API




## 写在后面
- 祝大家多多发财
