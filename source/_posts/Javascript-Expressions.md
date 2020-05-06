---
title: Javascript-Expressions
date: 2020-04-23 23:40:40
tags: 
- 前端概念
categories:
- 前端概念
description:
- Javascript -- Expression


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

# Javascript -- Expressions
<!-- more -->

# Atom


# Expressions 表达式
## Grammar




### 引导：Grammar Tree vs Priority
- \+ -
- \* /
- ()



## Left Handside & Right Handside
## Left Handside
- ![Left Handside](http://p0.meituan.net/myvideodistribute/4fa36955e4edcb6c2ae15f638759b365164257.png)
- 极限是 call

### Member
- a.b
- a[b]
- foo\`string\`
	
	```javascript
	var name = "Elle"
	function foo() {
	  console.log(arguments)
	}
	foo`Hello ${name}!`
	```
- super.b
	- 只能在 constructor 里使用
- super['b']

	```javascript
	class Parent {
		constructor() {
			this.a = 1
		}
	}
	class Child() {
		constructor() {
			super()
			console.log(this.a)
		}
	}
	```
- new.target
	- 函数外面不能使用，只能在函数里使用

		```javascript
		function foo() {
			console.log(this)
		}
		// 存在一个伪造对象的可能，无法知道对象是否是被 new 调起
		var fakeObj = {}
		Object.setPrototypeOf(fakeObj, foo.prototype)
		fakeObj.constructor = foo
		foo.apply(fakeObj)
		fakeObj instanceof foo
		
		```

		```javascript
		function foo() {
			console.log(new.target)
		}
		
		foo()
		
		new foo()
		
		```
- new Foo()
	- high priority
- Member Expressions 返回的是一个 Reference 类型
	- Reference

		```javascript
		var o = { x: 1 }
		o.x + 2
		1 + 2
		delete o.x
		delete 1
		```

### New
- new Foo 
	
- **Example**
	- new a()()
	- new new a()

		```javascript
		function cls1(s) { console.log(s)}
		function cls2(s) { console.log("2", s)return cls1; }
		new cls2
		cls2()
		new cls2() // 返回回来 cls2 实例，cls1对象
		new (cls2())
		new (new cls)
		new new cls2()
		```

### Call
- foo()
- super()
- foo()['b']
- foo().b
- foo()\`abc\`

- **Example**
	- new a()['b']
		
		```javascript
		class foo() {
			constructor() {
				this.b = 1
			}
		}
		new foo()['b']
		new (foo()['b'])
		foo["b"] = function(){}
		new foo('b')
		new (foo('b'))
		// 二者等效
		```



## Right Handside
### Update
- 【未完】 UpdateExpression
	- no LineTerminator here

		```javascript
		var a = 1, b = 1, c = 1;
		a
		++
		b
		++
		c
		console.log([a, b, c])
		a/*
		
		*/++
		b/*
		
		*/++
		c
		console.log([a, b, c])
		```
- a ++
- a --
- -- a
- ++ a

### Unary 单目运算符
- delete a.b
- void foo() 
	- void 不是返回值，是运算符在 JS 中
	- 不管后面是什么，都返回undefined
	- IIFE 立即执行函数
		
		```javascript
		for (var i = 0; i < 10; i ++) {
			var button  = document.createElement('button');
			documents.body.append(button);
			button.innerHTML = 1;
			button.onClick = function () {
				console.log(i)
			}
		}
		// 不敢点那个按钮，都是10，为解决这个问题，我们可以使用IIFE
		for (var i = 0; i < 10; i ++) {
			var button  = document.createElement('button');
			documents.body.append(button);
			button.innerHTML = 1;
			(function(i) {
				button.onClick = function (i) {
					console.log(i)
				}
			})()
		}
		// 如果前面不加分号，在一些写法中，会发生粘起来错误
    (function(i) {
      button.onClick = function (i) {
        console.log(i)
      }
    })()
    
    (function(i) {
      button.onClick = function (i) {
        console.log(i)
      }
    })()
		// 最稳妥的就是，在前面加上void
		for (var i = 0; i < 10; i ++) {
			var button  = document.createElement('button');
			documents.body.append(button);
			button.innerHTML = 1;
			void function(i) {
				button.onClick = function (i) {
					console.log(i)
				}
			}()
		}
		// 并且语义正确，我们并不需要IIFE的返回值
		```
- typeof a
	
	```javascript
	typeof null
	typeof function() {}
	```
- \+ a
- \- a
- ~ a 按位取反
- ! a 取非
	- !!1
- await a

### Exponental
- **
	- 3 ** 2 ** 3
	- 3 ** (2 ** 3)


### Multiplicative
- * / %
	- JS 中有1种乘法运算符
		- 运行时
			- number
			- string

### Additive
- + -
	- JS 中有2种加法运算符
		- 运行时
			- number
			- string

### Shift 左右移位
- << >> >>>

### Relationship 比较
- < > <= >= instanceof in

### Equality
- ==
- !=
- ===
- !==

### Bitwise
- & ^ |

### Logical
- 没有任何 boolean 转换
- &&
	- 有短路逻辑

		```javascript
		function foo1() {
			console.log(1)
			return false
		}
		function foo2() {
			console.log(2)
		}
		foo1() && foo2()
		
		foo1() || foo2()
		```
- ||



### Conditional
- ? :
	- 同样有短路逻辑
		
		```javascript
		false ? foo1() : foo2()
		```
		
### ,

## Runtime
### Type Convertion
- 【未完】转换图
- undefined --> number NAN


#### Boxing & Unboxing

```javascript
Number String Boolean Symbol
new Number(1)
new String('hello')
new String('hello').length
"hello".length
typeof "hello"
typeof new String('hello')
!new String('')
!""
Number String Boolean 不作为 new 调用，就是转换成普通类型
String(1)
new String(1)
```

- toPremitive()
- toString vs valueOf
  - 【未完】toString vs valueOf



## Reference
### Object
### Key
### 支持写
- delete
- assign


# Statement

# Structure

# Program/Module

#### ps. checkSign

```javascript
function check(number) {
	if (1 / number === Infinity) {
		return 1
	}
	if (1 / number === -Infinity) {
		return -1
	}
	return number / Math.abs(number)
}
```
- 【未完】Infinity 判断

- 【未完】直接用流取出符号位
