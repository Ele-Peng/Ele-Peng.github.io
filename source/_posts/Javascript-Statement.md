---
title: Javascript-Statement
date: 2020-04-26 17:01:45
tags: 
- 前端概念
categories:
- 前端概念
description:
- Javascript -- Statement


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


# Atom

# Expression

# Statement

## Grammar

### 简单语句

- ExpressionStatement
	- a = 1 + 2;
- EmptyStatement
	- ;
- DebuggerStatement
	- debugger
- ThrowStatement
	- throw a;
- ContinueStatement
	- continue ;
	- continue label;
- BreakStatement
	- break ;
	- break label;
- ReturnStatement
	- return ;
	- return expression;

<!-- more -->

### 组合语句

- BlockStatement
	- 把多条语句从语法上括起来，让它像一条语句一样
	
		```javascript
		{
		  Statement...
		  Statement...
		  Statement...
		}

  {
    a: 1 // a 被理解为 label
  }
		```
	- BlockStatement 中有非 normal ，就会中断
		
		```javascript
		{
		  const a = 1;
		  throw 1;
		  let b = 2;
		  b = foo();
		}
		```
	- 为 const / let 提供作用域
	- Completion Record
		- \[\[type]]: normal
		- \[\[value]]: --
		- \[\[target]]: --

- IfStatement
- SwitchStatement
- IterationStatement
    - <s>for await(... of ...)</s>
	- while(Expression...) Statement...
	- do Statement... while(Expression...);
	- for(Definition...; Expression...; Expression...) Statement...
		- Definition
			- var
			- const / let
		- for 会独立产生一个作用域，在 blockStatement 之外
		
			```javascript
			{
			  let i = 0;
			  {
			    let i = 1;
			    console.log(i)
			  }
			  console.log(i)
			}
			```
	- for(Definition... in Expression...) Statement....
	
		```javascript
		for(let i in {a: 1, b: 2}) {
		  console.log(i)
		}
		```
	- for(Definition...of Expression...) Statement...
	
		```javascript
		for(let i of [1, 2, 3]) {
		  console.log(i)
		}
		```
		```javascript
		function *g() {
		  yield 0;
		  yield 1;
		  yield 4;
		}
		for(let p  of g()){
		  console.log(p)
		}
		```
		
		> for of --> Iterator --> Generator/Array
		
		

- WithStatement
- LabelledStatement
- TryStatement

	```javascript
	try {
	  Statement...
	} catch(definition...) {
	  Statement...
	} finally {
	  Statement...
	}
	```
	```javascript
	try {
	  throw 2;
	} catch(e) {
	  let e;
	  console.log(e);
	}
	```
	```javascript
	var e = 3;
	try {
	  throw 2;
	} catch(e) {
	  console.log(e);
	}
	```
	- catch 中的声明，只在 {} 这一个作用域中，与 for 不一样。
	- 运行时产生错误的时候，都有可能产生 throw
		
		```javascript
		1 = a;
		null.a;
		```
	- Completion Record
		- \[\[type]]: return
		- \[\[value]]: --
		- \[\[target]]: label

### 标签、循环、break、continue
- LabelledStatement
- IterationStatement
- ContinueStatement
- BreakStatement
- SwitchStatement
- Completion Record
	- [[type]]: break continue
	- \[\[value]]: --
	- \[\[target]]: label

### 声明机制
- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
	
	```javascript
	function sleep(d) {
	  return new Promise(resolve => setTimeout(resolve, d))
	}
	void async function() {
	  var i = 0;
	  while(true) {
	    console.log(i ++);
	    await sleep(1000);
	  }
	}()
	```
- AsyncGeneratorDeclaration
	
	```javascript
	function sleep(d) {
	  return new Promise(resolve => setTimeout(resolve, d))
	}
	async function* foo() {
	  var i = 0;
	  while(true) {
	    yield i ++;
	    await sleep(1000);
	  }
	}
	void async function() {
	  var g = foo();
	  console.log(await g.next());
	  console.log(await g.next());
	  console.log(await g.next());
	  console.log(await g.next());
	  console.log(await g.next());
	}()
	// 想无限循环输出
	
	void async function() {
	  var g = foo();
	  for await(let e of g) {
	    console.log(e)
	  }
	}()
	```
- VariableStatement
- ClassDeclaration
- LexicalDeclaration
- 声明
	- function
	- function *
	- async function
	- async function*
	- var
		- 有 var 不建议写在任何语句子结构里，建议写在 function 的范围内

		```javascript
		var x = 0;
		function foo() {
		  var o = {x: 1};
		  x = 2;
		  with(o) {
		    var x = 3;
		  }
		  console.log(x); // --> 2
		  console.log(o.x); // --> 3
		}
		foo()
		console.log(x); // --> 0

		```
		
		```javascript
		var x = 0;
		function foo() {
		  var o = {x: 1};
		  x = 2;
		  with(o) {
		    x = 3;
		  }
		  console.log(x); // --> 2
		  console.log(o.x); // --> 3
		}
		foo()
		console.log(x); // --> 2

		```

	- class
	- const
	- let

## Runtime

### Completion Record

- \[\[type]]: normal, break, continue, return, throw
- \[\[value]]: Types
- \[\[target]]: label



### Lexical Environment

## 预处理（pre-process）BoundNames


```javascript
var a = 2;
void function (){
  a = 1;
  console.log(a) 
  return ;
  var a;
}()
console.log(a);
```
![var 预处理](http://p0.meituan.net/myvideodistribute/21745b775ee2bfb77aa1efdff233619737142.png)

```javascript
void a = 2;
void function (){
  a = 1;
  return ;
  const a;
}();
console.log(a);
```
![const 无预处理](http://p1.meituan.net/myvideodistribute/172ab6a2ba78132f1dd33f2f5b64e11044523.png)
## 作用域

```javascript
var a = 2;
void function (){
  a = 1;
  {
    var a;
  }
}();
console.log(a);
```

```javascript
var a = 2;
void function (){
  a = 1;
  {
    const a;
  }
}();
console.log(a);
```

![作用域](http://p0.meituan.net/myvideodistribute/8b9ac53e3ae6dfca675786084237d0d971523.png)

- 作用域与上下文的区别
	- 作用域可以简单理解为源代码文本的作用区域
	- 执行上下文可以理解为，在用户的电脑上，内存里的，存变量的地方，JavaScript 引擎在执行过程中需要的变量，引擎里的那块内存。


# Structure

# Program/Module