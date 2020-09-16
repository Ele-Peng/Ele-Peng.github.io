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
- 本来这个很早就能写完的，周五学了个空翻，周六去上了个身体开发基础课，然后全身酸痛，酸痛到起床都起不来的那种，就拖了两天
- 但我至少没有鸽掉 嘻嘻嘻 【手动狗头

<!-- more -->


## 选择器语法

### 简单选择器
- ![简单选择器结构图](https://static001.geekbang.org/resource/image/4c/ce/4c9ac78870342dc802137ea9c848c0ce.png)
- 针对某一特征判断是否选中元素。
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
	- [attr]
		- 直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中
		- ![[attr]](http://p0.meituan.net/myvideodistribute/ee7f5620eec48d0a237b15ed61a83404257138.png)
	- [attr=val]
		- 精确匹配，检查一个元素属性的值是否是 val
		- ![[attr=val]](http://p0.meituan.net/myvideodistribute/1adfecc2daa770b4192909740af66b1d259781.png)
	- [att~=val]
		- 多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列
		- ![[att~=val]](http://p0.meituan.net/myvideodistribute/b61188491bb578e4f96ef97baa6b263c264908.png)
	- [att|=val]
		- 开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管（红圈圈出的是生效样式）
		- ![[att|=val]](http://p0.meituan.net/myvideodistribute/4f1459c9d673adf7ac337f06569ec688330483.png)
		
- 伪类选择器
	- 树结构关系伪类选择器
		- :root
			- 表示树的根元素
		- :empty
			- 表示没有子节点的元素

				```html
				<div class="box"><!-- I will be lime. --></div>
				<div class="box">I will be pink.</div>
				<div class="box">
					<!-- I will be pink in older browsers because of the whitespace around this comment. -->
				</div>
				<div class="box">
					<p><!-- I will be pink in all browsers because of the non-collapsible whitespace and elements around this comment. --></p>
				</div>
				```
				```css
				.box {
					  background: pink;
					  height: 80px;
					  width: 80px;
					}
					
					.box:empty {
					  background: lime;
					}
				```
			- ![:empty 伪类运行结果]()
		- :nth-child 和 :nth-last-child
			- ![nth-child 和 :nth-last-child](https://static001.geekbang.org/resource/image/1e/a9/1ebdba2978a22c13844d108318b271a9.png)
		- :nth-last-child
			- 从后往前数
		- :first-child :last-child
			- 分别表示第一个和最后一个元素
		- :only-child
			- 按字面意思理解即可，选中唯一一个子元素
	- 链接与行为伪类选择器（链接与行为是第一批设计出来的伪类，也是最常用的一批）
		- :any-link
			- 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类
		- :link
			- 表示未访问过的链接
		- :visited
			- 表示已经访问过的链接
		- :hover
			- 表示鼠标悬停在上的元素
		- :active
			- 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态
		- :focus
			- 表示焦点落在这个元素之上
		- :target
			- 用于选中浏览器 URL 的 hash 部分所指示的元素

	- 逻辑伪类选择器
		- :not
			- 但目前还没有看到浏览器实现它

	- 其它伪类选择器
		- 国际化：用于处理国际化和多语言问题。
			- dir
			- lang
		- 音频 / 视频：用于区分音视频播放状态。
			- play
			- pause
		- 时序：用于配合读屏软件等时序性客户端的伪类。
			- current
			- past
			- future
		- 表格：用于处理 table 的列的伪类。
			- nth-col
			- nth-last-col
- 伪元素选择器
	- ::first-line
		- 表示元素的第一行
		- first-line 若有 float ，则会脱离文档流出去，然后又选中第一行，又脱离文档流出去循环了
	- ::first-letter
		- 表示元素的第一个字母
		- CSS 标准只要求 ::first-line 和 ::first-letter 实现有限的几个 CSS 属性，都是文本相关，这些属性是下面这些
			- ![实现有限的几个 CSS 属性](https://static001.geekbang.org/resource/image/6e/48/6e050ee9f7a0b1657388271cceb0c548.png)
	- ::before
		- 表示在元素内容之前插入一个虚拟的元素
	- ::after
		- 则表示在元素内容之后插入


### 复合选择器
- 连续写在一起的简单选择器，针对元素自身特征选择单个元素
- &lt;简单选择器&gt;&lt;简单选择器&gt;&lt;简单选择器&gt;
- \* 或者 div 必须写在最前面

### 复杂选择器
- 由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素
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
- 以 comma 分隔的复杂选择器序列，表示“或”的关系

## 选择器优先级
- [图解 css-specificity](http://www.standardista.com/css3/css-specificity/)
- [w3 css-specificity](https://www.w3.org/TR/2018/WD-selectors-4-20181121/#specificity-rules)
- [MDN css-specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- 结论：**[ inline-element,    id,    class | pseudo | attr,    type ]
:not 伪类不参与计算**
- exercise
	- div#a.b .c[id=x]
		- [0,1,3,1]
	- \#a:not(#b)
		- [0,2,0,0]
	- *.a
		- [0,0,1,0]
	- div.a
		- [0,0,1,1]

## 优化 toy-browser CSS selector match
- 首先我们可以先观察
	- toy-browser 是根据 space 拆分选择器的。那么选择器我们需要处理特殊情况只有 
		- \#id.cls1.cls2.cl3
		- .cls1\#id.cls2
		- div.cls1.cls2
		- .cls1.cls2
	- 类型选择器有且只有一个（一对起止标签，一个类型上只能有一个唯一 id，表示一个元素）
	- id选择器有且只有一个（一对起止标签，即一个类型，表示一个元素）
		- 因为没有标识符，只能出现在开头
		- div.cls1.cls2
		- 不可能为
			- .cls1div.cls2
	- class 选择器可以有多个
- 所以我们可以第一步，先处理 id 选择器 + 类型选择器特殊情况
	
	```javascript
	function match(element, selector) {
	  if (!selector || !element.attributes) 
	    return false
	
	  let regId = /(#\w+)+/g
	  let resId = selector.match(regId)
	  
	  if (resId && resId[0].charAt(0) == "#") { // id选择器有标识符#，因此可以出现在任意位置，需要用正则去匹配
	    const attr = element.attributes.filter(attr => attr.name === "id")[0]
	    if (attr && attr.value === resId[0].replace("#", '')) {
	      return true
	    } else {
	      return false
	    }
	  } else if(selector.charAt(0) !== "#" && selector.charAt(0) !== "."){ // 只需要判断选择器开头是不是 非 id 选择器标识符 # 或者 class 选择器标识符 .
	    if (element.tagName === selector) {
	      return true
	    } else {
	      return false
	    }
	  }
	}

	```
- 处理多 class 选择器情况

	```javascript

	function match(element, selector) {
	
     // some code ...
	
	  let regClass = /(\.\w+)+/g
	  let resClass = selector.match(regClass)
	
     // some code ...
     
	
	  if (resClass) {
	    let resClassArr = [] // style class selector数组
	    for (let i = 0; i < resClass.length; i ++) { // 处理 .cls1#id.cls2 匹配出来 [".cls1", ".cls2"] 情况
	      let tempArr = resClass[i].split('.')	      for (let j = 1; j < tempArr.length; j ++) { // 索引从1开始，因为 ["", "cls1", "cls2"]
	        resClassArr.push(tempArr[j])
	      }
	    }
	    let classAttr = element.attributes.filter(attr => attr.name === "class")
	    let classAttrRes = []
	    // 元素 attr class 数组，classAttr:  [ { name: 'class', value: 'c2 c3' } ]
	    if (classAttr && classAttr[0]) {
	      classAttrRes = classAttr[0]["value"].split(" ")
	    }
	    let tempFlag = null
	    for (let i = 0; i < resClassArr.length; i ++) {
	      tempFlag = false
	      let k = 0
	      for (; k < classAttrRes.length; k ++) {
	        if (classAttrRes[k] === resClassArr[i]) { // 拿 style class selector 与 element class attribute 进行比较
	          tempFlag = true
	          break
	        }
	      }
	      if (!tempFlag && k === classAttrRes.length) { // 如果没有匹配到，并且匹配到最后一位
	        return false;
	      }
	    }
	  }
	
     // some code ...
     
	  return true
	}

	```
	
- 最后我们别忘了修改 specificity 的计算逻辑

	```javascript
	function specificity(selector) {
	  const p = [0, 0, 0, 0]
	  const selectorParts = selector.split(" ")
	  let regClass = /(\.\w+)+/g
	  let resClass = selector.match(regClass)
	  if (resClass && resClass.length) {
	    for (let i = 0; i < resClass.length; i ++) {
	      let tempArr = resClass[i].split('.')
	      for (let j = 1; j < tempArr.length; j ++) {
	        p[2] ++
	      }
	    }
	  }
	  for (let part of selectorParts) {
	
	    let regId = /(#\w+)+/g
	    let resId = part.match(regId)
	    if (resId && resId[0].charAt(0) == "#") {
	      p[1] += 1
	    } else if (part.charAt(0) !== "#" && part.charAt(0) !== "."){
	      p[3] += 1
	    }
	  }
	  console.log('selector', selector)
	  console.log('p', p)
	  return p
	}
	```
	
- 测试用例一
	
	```html
	<html maaa=a >
		<head>
		  <style>
			#container{
			  width:500px;
			  height:300px;
			  display:flex;
			  background-color:rgb(255,255,255);
			}
			#container #myid{
				width:200px;
				height:100px;
				background-color:rgb(255,0,0)
			}
			#container .c1{
				flex:1;
				background-color:rgb(0,255,0)
			}
			#container .c2#myid.c3{
				width:200px;
				height:100px;
				background-color:rgb(0,0,255)
			}
		</style>
		</head>
		<body>
		  <div id="container">
		    <div id="myid" class="c2 c3"></div>
		    <div class="c1"></div>
		  </div>
		</body>
    </html>
    ```
    - 运行截图
    	- ![运行截图](http://p0.meituan.net/myvideodistribute/4d585e3777f3371a9fd976dce2698bc6163838.png)
    - css specificity 计算截图
    	- ![css specificity 计算截图](http://p1.meituan.net/myvideodistribute/8566a8d6a4fcb229b6a1005946fd686647911.png)

    	
- 测试用例二
	
	```javascript
	<html maaa=a >
		<head>
		  <style>
			#container{
			  width:500px;
			  height:300px;
			  display:flex;
			  background-color:rgb(255,255,255);
			}
			#container #myid{
				width:200px;
				height:100px;
				background-color:rgb(255,0,0)
			}
			#container .c1{
				flex:1;
				background-color:rgb(0,255,0)
			}
			#container.wrapper .c3.c2{
				width:200px;
				height:100px;
				background-color:rgb(0,0,255)
			}
		</style>
		</head>
		<body>
		  <div id="container" class="wrapper">
		    <div id="myid" class="c2 c3"></div>
		    <div class="c1"></div>
		  </div>
		</body>
    </html>
	```
	- 运行截图
		- ![运行截图](http://p0.meituan.net/myvideodistribute/c73ede6bb822726ff171e2b7dbaa5fdb156331.png)
	- css specificity 计算截图
		- ![css specificity 计算截图](http://p0.meituan.net/myvideodistribute/af1f074f1e418a539ce900efdfa3498a44257.png)



## 写在后面
- [完整代码地址-点击一下](https://github.com/Ele-Peng/toy-browser)
- 祝大家多多发财
