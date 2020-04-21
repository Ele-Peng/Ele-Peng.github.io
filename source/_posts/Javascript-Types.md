---
title: Javascript Types
date: 2020-04-20 11:19:06
tags: 
- 前端概念
categories:
- 前端概念
description:
- Javascript -- Types
---

[TOC]

# Javascript -- Type
## Atom
### Unicode （字符集）
- Unicode Blocks
	- JS使用的不是ASCII字符集，但是都要兼容ASCII字符集
		- a 码点 --> 97, A 码点 --> 65
	- U+000A LINE FEED 换行
		- Form Feed 翻页
		- CJK 中文字符 Chinese Japan Korean
	- U+0020 SPACE 空格
	- BMP 基本字符平面 四位能表示的范围
	- 超出BMP范围
		- fromCodePoint
		- codePointAt
	- 隐性需求需要可以使用\u转义
		- "厉害".codePointAt(0).toString(16)
		- \u5389\u5bb3
<!-- more -->

- InputElement
	- WhiteSpace 空格
		- &lt;TAB&gt; Character Tabulation
		- &lt;VT&gt; Vertical Line
		- &lt;FF&gt; Form Feed 
		- &lt;SP&gt; 
		- &lt;NBSP&gt; html根据空格分词，不想让词分根据空格分开，可以使用&nbsp;
		- &lt;ZWNBSP&gt; U+FEFF Zero WIDTH NO-BREAK SPACE，BOM --> Bit Order Mask
		- &lt;USP&gt;
	- LineTerminator 换行符
		- &lt;LF&gt; /n
		- &lt;CR&gt; Carriage Return 回车 /r
		- &lt;LS&gt; LINE SEPARATOR
		- &lt;PS&gt; PARAGRAPH SEPARATOR
	- Comment 注释
	- **Token** 与word不同，记号标记，JS中有效的东西
		- 自己写的，代码包含的有效信息
			- **Identifier** 标识符，以英文字母开头
				- 用作变量名，不能与关键字重复
					- undefined 全局变量名，修改不了
					- 离开全局作用域，便可以使用
				- 用作属性的部分，可以与关键字重复
				- Future reserved Keywords : enum
			- **Literal** 直接量
				- Number	
				- String
				- Boolean
				- Object
				- Null
				- Undefined
				- Symbol
		- 帮助程序形成结构
			- **Punctuator** 符号
			- **Keywords** 

			
### Types
#### Number
- IEEE 754 Double Float
	- Sign(1)
	- Exponent(11) 指数，科学计数法
	- Fraction(52)
- Grammar
	- DecimaLiteral
		- 0
		- 0.
		- .2
		- 1e3
	- BinaryIntegerLiteral
		- 0b111
	- OctalIntegerLiteral
		- 0o10
	- HexIntegerLiteral
		- 0xFF
- 最佳实践
	- 浮点数比较时，需要加精度
	
		> Number.MAX\_SAFE\_INTEGER
		
		> Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
	
	
#### String
- Character
- Code Point
- Encoding
	
	> 97 .toString(2)
	
	> "97." 是一个合法的Number 01100001
	
	- ASCII
	- Unicode
	- UCS U+0000 - U+FFFF
	- GB
		- GB2312
		- GBK(GB13000)
		- GB18030
	- ISO-8859
	- BIG5
- Grammar
	- "abc"
		- "\x10" --> 8
		- "\u000a"
	- 'abc'
	- \`abc\`
		
		```javascript
		var a;
		/a/g 正则表达式直接量
		(a)
		/a/g --> 则表示除法
		(a)/a/g
		```
		
	
#### Boolean
- true
- false




#### Object

#### Null
- typeof 下为 Object


#### Undefined

#### Symbol

## Expression
## Statemment
## Structure
## Module
