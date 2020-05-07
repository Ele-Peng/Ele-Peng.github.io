---
title: Javascript-运行机制（一）
date: 2020-04-30 23:55:49
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

## 写在前面
- 五一假期，来写一写 Promise 的题吧，嘿嘿嘿 😃
- 五一倒计时 3 天

<!-- more -->

## 实践准备


```Objective-C
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argx, const char * argv[]) {
  @autoreleasepool {
    // var context = new JSContext
    
    
    // define a javascript context
    JSContext* context = [[JSContext alloc] init];
    // like:var result = null;
    JSValue* result;
    
    while(true) {
      char sourcecode[1024];
      
      scanf('%s', &sourcecode);
      NSString* code = [NSString stringWithUTF8String: sourcecode];
      
      result = [context evaluateScript:code];
      
      NSLog(@"%@", [result toString]);
      
    }
  
  return 0;

}

```

- 如上实现一个简单的事件循环，用来输出 console
- ![OC 方法](http://p1.meituan.net/myvideodistribute/a99619da1cded49f443ded2fc219b27432778.png)
- 我们在 Javascript 中讲的微任务队列、宏任务队列，是 Javascript 调用方去使用 Javascript 的一种方式，如果仅是执行一段代码，是不需要事件循环的。通过这段代码，是可以看出来，Javascript 的事件循环，是在 JSContext 之外，事件循环相关知识，既不是 Javascript 引擎的一部分，也不是 Javascript 语言的一部分。
- code 的传入方式
	- &lt;script&gt;&lt;/script&gt; 普通代码片段
	- &lt;script type="module"&gt;&lt;/script&gt;
	- 函数


```Objective-C
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argx, const char * argv[]) {
  @autoreleasepool {
    // var context = new JSContext
    
    
    // define a javascript context
    JSContext* context = [[JSContext alloc] init];
    // like:var result = null;
    JSValue* result;
    
    // TODO: calculate the square of arg x
    NSString* code = @"(function(x){ return x * x; })";
    
    
    // like: result = (function(x){ return x * x; })
    result = [context evaluateScript:code];
    
    // passing the number 4 into the function
    JSValue* arg1 = [JSValue valueWithInt32:4 inContext:context];
    
    // execute the function with arg of 4
    NSLog(@"%@", [[result callWithArguments:@[arg1]] toString]);
  
  }
  
  return 0;

}

```

- 上面的 Object-C 代码，可以看出来，我们是将一段一段的代码，传入 evaluateScript 中执行。


```Objective-C
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argx, const char * argv[]) {
  @autoreleasepool {
    // var context = new JSContext
    
    
    // define a javascript context
    JSContext* context = [[JSContext alloc] init];
    // like:var result = null;
    JSValue* result;
    
    // TODO: calculate the square of arg x
    NSString* code = @"new Promise(resolve => resolve()).then(() => this.a = 3), function(){return this.a};";
        
    result = [context evaluateScript:code];
    
    // like: result();
    NSLog(@"%@", [[result callWithArguments:@[]] toString]);
  
  }
  
  return 0;

}

```

- evaluateScript 实际上执行两步：
	1. 执行整个方法
		
		> new Promise(resolve => resolve()).then(() => this.a = 3), function(){return this.a};
	
		- 逗号表达式，永远返回后面的值，如果被调用，前面的会被执行
	2. 执行 Promise 中 then 后面的语句
	- ![evaluateScript](http://p0.meituan.net/myvideodistribute/81d945c99778450fd86a710f20355cbc269796.png)
	- 有 then ,可能产生一个宏任务里面有多个微任务的情况， 一切JS 代码都是微任务中执行的
	- 拿浏览器举例：setTimeout、setInterval 这种其实不是 JS 语法本身的 API，是 JS 的宿主浏览器提供的 API， 所以是宏任务。
	- 而 Promise 是 JS 本身自带的 API，这种就是微任务。
- 总结：**宿主提供的方法是宏任务，JS 自带的是微任务**
- **任务列表列里面有很多宏任务，然后每个宏任务里面有一个微任务列表，每个宏任务执行下一个宏任务之前会把自己内部的微任务执行完**
- **宏任务**包括：script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering。
- **微任务**包括：MutationObserver、Promise.then()或catch()、Promise为基础开发的其它技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick。
		


# Javascript 结构化程序设计基础设施


## 实践记录
### 基础题

1.1 题目一

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
})
console.log('1', promise1);
```

- 分析：
	- 从上至下，先执行 new Promise，执行该构造函数中 console.log('promise1')
	
	> console.log('1', promise1);
	
	- 再执行同步代码
	- 执行完后， promise1 中并没有 resolved, rejected， 一直处在 pending 的状态

- 运行结果
	- ![题目一执行](http://p0.meituan.net/myvideodistribute/f45e1dbe45d84e46ab2fd24703cad0c521137.png)

1.2 题目二

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

- 分析
	- 从上至下，先执行 new Promise，执行该构造函数中
		- console.log(1);
		- resolve('success') 将 promise 中的状态更改为 resolved，并保存下来
		- console.log(2);
	- promise.then 入队微任务队列
	- 再执行当前宏任务中的同步代码
		- console.log(4);
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列，且 promise 为resolved，执行 promise.then
		- console.log(3);

- 运行结果
	- ![题目二执行](http://p0.meituan.net/myvideodistribute/c31fd6e9ba9c9f9ac4062d6b395706f230745.png)

1.3 题目三

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

- 分析
	- 从上至下，先执行 new Promise，执行该构造函数中
		- console.log(1);
		- console.log(2);
		- 该 promise 没有 resolved, rejected, 一直处在 pending
	- promise.then 入队微任务队列
	- 再执行当前宏任务中的同步代码
		- console.log(4);
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列，但 promise 为pending，不可能执行 promise.then 中方法

- 运行结果
	- ![题目三执行](http://p0.meituan.net/myvideodistribute/b6e827ca293c65c261a83a81f1f5411227105.png)

1.4 题目四

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
```

- 分析
	- 从上至下，先执行 new Promise，执行该构造函数中
		- console.log('promise1')
		- resolve('resolve1') 将 promise 中的状态更改为 resolved，并保存下来
	- promise1.then 入队微任务队列
	- promise2 是一个新状态为 pending 的 Promise
	- 执行同步代码
		- console.log('1', promise1);
			- promise1 中状态在上面已经更改为 resolved
		- console.log('2', promise2);
			- promise2 中状态为pending
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise1.then 
		- console.log(res) 
			- 其中 promise1.then， promise1 的状态为 resolved

- 运行结果
	- ![题目四运行结果](http://p0.meituan.net/myvideodistribute/f31e7f8db309521b5252143252eaed2551272.png)


1.5 题目五

```javascript
const fn = () => (new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
}))
fn().then(res => {
  console.log(res)
})
console.log('start')
```

- 分析
	- 从上至下，const fn = () => (Promise Object) 返回一个 promise 对象
	- fn()，执行 fn 方法
		- console.log(1);
		- resolve('success') 将 promise 中的状态更改为 resolved，并保存下来
	- Function.then 入队微任务队列
	- 执行同步代码
		- console.log('start')
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 Function.then
		- console.log(res) 其中 promise 的状态为 resolved

- 运行结果
	- ![题目五运行结果](http://p1.meituan.net/myvideodistribute/955895672615c24a4eb671617d8b739829033.png)


1.6 题目六

```javascript
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("start");
fn().then(res => {
  console.log(res);
});
```

- 分析
	- 从上至下，const fn = () => (Promise Object) 返回一个 promise 对象
	- 执行同步代码
		-  console.log("start");
	- fn(), 执行 fn 方法
		- console.log(1);
		- resolve("success"); 将 promise 中的状态更改为 resolved，并保存下来
	- Function.then 入队微任务队列
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 Function.then
		- console.log(res); 其中 promise 的状态为 resolved

- 运行结果
	- ![题目六运行结果](http://p0.meituan.net/myvideodistribute/ccd1a9148be91f5aa24847a0d4e23dfb31837.png)

### Promise 结合 setTimeout

2.1 题目一

```javascript
console.log('start')
setTimeout(() => {
  console.log('time')
})
Promise.resolve().then(() => {
  console.log('resolve')
})
console.log('end')
```

- 分析
	- 从上至下，先执行同步代码
		- console.log('start')
	- setTimeout ... 入队宏任务队列
	- Promise.resolve().then ... 入队微任务队列
	- 执行同步代码
		- console.log('end')
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 Promise.resolve().then
		- console.log('resolve')
	- 第一个宏任务执行完了，开始执行下一个宏任务 setTimeout ...
		- console.log('time')

- 运行结果
	- ![题目一运行结果](http://p0.meituan.net/myvideodistribute/4a9c74ab2a26cc16e55ce53f6fb765d630133.png)

2.2 题目二

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
```

- 分析
	- 从上至下，先执行 new Promise，执行该构造函数中
		- console.log(1);
		- setTimeout ... 入队宏任务队列
		- console.log(2);
	- promise.then ... 入队微任务队列
	- 执行同步代码
		- console.log(4);
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 其中 promise 中，并没有 resolved、rejected，一直在 pending，不可能执行 promise.then 中方法
	- 第一个宏任务执行完了，开始执行下一个宏任务 setTimeout ...
	- 第二个宏任务 setTimeout 代码从上至下执行
	- 执行同步代码
		- console.log("timerStart");
		- resolve("success"); 将 promise 中的状态更改为 resolved，并保存下来
		- console.log("timerEnd");

- 运行结果
	- ![题目二运行结果](http://p0.meituan.net/myvideodistribute/66ea5bbd68d0841ad58cac5ca771625347414.png)

	
2.3 题目三

```javascript
setTimeout(() => {
  console.log('timer1');
  setTimeout(() => {
    console.log('timer3')
  }, 0)
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')
```

- 分析
	- 从上执行
	- setTimeout ... 加入宏任务队列
	- setTimeout ... 加入宏任务队列
	- 执行同步代码
		- console.log('start')
	- 第一个宏任务执行完了，开始执行下一个宏任务 setTimeout ...
	- 执行同步代码 
		- console.log('timer1');
	- setTimeout ... 加入宏任务队列
	- 第二个宏任务执行完了，开始执行下一个宏任务
	- 执行同步代码
		- console.log('timer2')
	- 第三个宏任务执行完了，开始执行下一个宏任务
	- 执行同步代码
		- console.log('timer3')

- 运行结果
	- ![题目三运行结果](http://p0.meituan.net/myvideodistribute/b5ab6578c5ba7d8d727a3bf47ba8879033812.png)

```javascript
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')
```

- 分析
	- 代码从上至下开始执行
	- setTimeout ... 加入宏任务队列
	- setTimeout ... 加入宏任务队列
	- 执行同步代码
		- console.log('start')
	- 第一个宏任务执行完了，开始执行下一个宏任务 setTimeout ...
	- 执行同步代码
		- console.log('timer1');
		- Promise.resolve().then ... 入队微任务队列
		- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列
			- console.log('promise')
	- 第二个宏任务执行完了，开始执行下一个宏任务 setTimeout ...
	- 执行同步代码
		- console.log('timer2')

- 运行结果
	- ![题目三运行结果](http://p0.meituan.net/myvideodistribute/f65f2aa65848d2e8aaf5c3918509c6e934427.png)


2.4 题目四

```javascript
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');
```

- 分析
	- 代码从上至下开始执行
	- Promise.resolve().then ... 入队微任务队列
	- setTimeout ... 入队宏任务队列
	- 执行同步代码
	- console.log('start');
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列
	- 执行同步代码
	- console.log('promise1');
	- setTimeout ... 入队宏任务队列
	- 第一个宏任务执行完了，开始执行下一个宏任务 setTimeout ...
	- console.log('timer2')
	- 第二个宏任务执行完了，开始执行下一个宏任务
	- 执行同步代码
	- console.log('timer1')
	- Promise.resolve().then ... 入队微任务队列
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列
	- console.log('promise2')
	- 第二个宏任务执行完了，开始执行下一个宏任务
	- console.log('timer2')

- 运行结果
	- ![题目四运行结果](http://p1.meituan.net/myvideodistribute/60a22379f31bb12de055ed83a31aca0b46969.png)

2.5 题目五 ** 存在和之前一样的，promise resolved 后，状态上抛至上一个 宏任务队列的问题

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```

- 分析
	- 代码从上至下开始执行
	- 先执行 new Promise，执行该构造函数中
	- setTimout ... 入队宏任务队列
	- promise1.then ... 入队微任务队列
	- 执行同步代码
		- console.log('promise1', promise1)
			- 其中 promise1 没有 resolved、rejected,一直处在 pending 状态
			- promise1 Promise {\<pending\>}
		- console.log('promise2', promise2)
			- 其中 promise1 一直处在 pending 状态，直接影响到 promise2 也一直处在 pending 状态
			- promise2 Promise {\<pending\>}
	- setTimeout ... 入队宏任务队列
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise1.then ...
		- 由于 promise1 仍处于 pending 状态，不可能执行 promise1.then ...
	- 第一个宏任务执行完了，开始执行下一个宏任务
	- resolve('success') 将 promise1 中的状态更改为 resolved，并保存下来
	- 第二个宏任务执行完了，开始执行下一个宏任务
	- 执行同步代码
		- console.log('promise1', promise1)
			- 其中 promise1 处在 resolved 状态
			- promise1 Promise {\<resolved\>: "success"}
		- console.log('promise2', promise2)
			- promise2 Promise {\<rejected\>: Error: error!!! at \<anonymous\>:8:9}

- 运行结果
	- ![题目五运行结果](http://p0.meituan.net/myvideodistribute/3ad654d66c66c648a058adf29154d879107368.png)


2.6 题目六

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    console.log("timer1");
  }, 1000);
  console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
  console.log("timer2");
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);
```

- 分析
	- 代码从上至下开始执行，先执行 new Promise，执行该构造函数
	- setTimeout 入队宏任务队列
	- 执行同步代码
		- console.log("promise1里的内容");
	- promise1.then ... 入队微任务队列
	- 执行同步代码
		- console.log("promise1", promise1);
			- 其中 promise1 没有 resolved、rejected 掉，一直处在 pending 状态
				- promise1 Promise {\<pending\>}
		- console.log("promise2", promise2);
			- primise1 的 pending 状态，直接影响 promise2 也处在 pending 状态
				- promise2 Promise {\<pending\>}
	- setTimeout ... 入队宏任务队列
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise1.then ...
		- 由于 promise1 仍处于 pending 状态，不可能执行 promise1.then ...
	- 第一个宏任务执行完了，开始执行第二个宏任务
	- resolve("success"); 将 promise1 中的状态更改为 resolved，并保存下来
	- 执行同步代码
		- console.log("timer1");
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise1.then ...
		- throw new Error("error!!!");
	- 第二个宏任务执行完了，开始执行下一个宏任务
		- 执行同步代码
			- console.log("timer2");
			- console.log("promise1", promise1);
				- 其中 promise1 的状态已经 resloved
				- promise1 Promise {\<resolved\>: "success"}
			- console.log("promise2", promise2);
				- promise2 Promise {\<rejected\>: Error: error!!! at \<anonymous\>:8:9}

- 运行结果
	- ![题目六运行结果](http://p1.meituan.net/myvideodistribute/88a197ec5863fcca93b072d3baecf6a0113849.png)


### Promise 中的 then、catch、finally

3.1 题目一

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  })
```

- 分析
	- 代码从上至下开始执行，先执行 new Promise，执行该构造函数
		- resolve("success1"); 将 promise 中的状态更改为 resolved，并保存下来
	- promise.then ... 入队微任务队列
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise.then ...
		- console then:  success1

- 运行结果
	- ![题目一运行结果](http://p0.meituan.net/myvideodistribute/448d9fb1db29ba7e76762f97a9508d1e35386.png)
- 结论
	- **Promise的状态一经改变就不能再改变**
	- **构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用**。


3.2 题目二

```javascript
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })
```

- 分析
	- 代码从上至下开始执行，先执行 new Promise，执行该构造函数
		- reject("error"); 将 promise 中的状态更改为 rejected，并保存下来
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise.then ...
	- 由于 promise 状态为 rejected，因此触发 catch ，不管 catch 连接到哪，都能捕获上层未捕捉过的错误
		- console.log("catch: ", err);
		- return a new promise
	- 由于 新的 promise 没有返回值，因此返回 undefined

- 结论
	- **catch不管被连接到哪里，都能捕获上层未捕捉过的错误**
	- 至于 then3 也会被执行，那是因为**catch()也会返回一个 Promise **，且由于这个 Promise 没有返回值，所以打印出来的是 undefined 。

- 运行结果
	- ![题目二运行结果](http://p0.meituan.net/myvideodistribute/8523408bd03cb268237e720380e1273d47036.png)

	
3.3 题目三

```javascript
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  });
```

- 分析
	- 代码从上至下开始执行
	- promise 状态为 resolved, 因此触发 then
		- console.log(res); res --> 1
	- 没有报错，略过 catch
	- 被 then 捕捉
		- console.log(2); 返回新的 promise， promise 返回 resolve(2)

- 结论
	- **Promise 可以链式调用**，不过 promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用, 它并不像一般我们任务的链式调用一样 return this。

- 运行结果
	- ![题目三运行结果](http://p0.meituan.net/myvideodistribute/2ca378bb1952c6fbacc3028024b1b89027624.png)


3.4 题目四

```javascript
Promise.reject(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    console.log(err);
    return 3
  })
  .then(res => {
    console.log(res);
  });
```

- 分析
	- 代码从上至下开始执行
	- promise 状态为 rejected，因此触发 catch
		- console.log(err); err --> 1
		- return resolve(3)
	- 被 then 捕捉
		- console.log(3) 

- 运行结果
	- ![题目四运行结果](http://p0.meituan.net/myvideodistribute/ed821dfd96ad96250140abdedf581fd930226.png)


3.5 题目五

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('timer')
    resolve('success')
  }, 1000)
})
const start = Date.now();
promise.then(res => {
  console.log(res, Date.now() - start)
})
promise.then(res => {
  console.log(res, Date.now() - start)
})
```

- 分析
	- 代码从上至下开始执行，先执行 new Promise，执行该构造函数
	- setTimeout ... 入队宏任务队列
	- promise.then ... 入队微任务队列
	- promise.then ... 入队微任务队列
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 promise.then ...
	- 因为 promise 状态并没有 resolved、rejected，一直处在 pending，并不能调用 then 方法
	- 同上
	- 第一个宏任务执行完成，开始执行第二个宏任务 setTimeout ...
	- 执行同步代码
		- console.log('timer')
		- promise 状态更改为 resolved，并保存下来
			- 状态往上抛
			- console.log(res, Date.now() - start)
			- console.log(res, Date.now() - start))

- 结论
	- **Promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。**
- 运行结果
	- ![题目五运行结果](http://p0.meituan.net/myvideodistribute/9ee74ca562f7c913d51c9fd5fe60680543896.png)

3.6 题目六

```javascript
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
```

- 分析
	- 代码从上至下开始执行
	- promise 状态更改为 resolve，并无返回值
	- 执行 then
		- throw new Error('error!!!')
		- return Promise.reject(new Error('error!!!'))
	- 被 catch 捕捉
		- console.log("catch: ", err) err --> error

- 运行结果
	- ![题目六运行结果](http://p0.meituan.net/myvideodistribute/a1cb4e4f5e5ec95e2215d5b7ecc6a32428525.png)
	
	
3.7 题目七

```javascript
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
```

- 分析
	- 代码从上至下开始执行
	- promise 状态改变为 resolve ，并无返回值
	- 执行 then
		- return Promise.resolve(promise)
		- Chaining cycle detected for promise
	- 执行同步代码
		- promise.catch promise cycle

- 运行结果
	- ![题目七运行结果](http://p0.meituan.net/myvideodistribute/70dbed986bad1d410ad7be3de8fe963d21008.png)

	
3.8 题目八

```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

- 分析
	- 代码从上至下开始执行
	- promise 状态改变为 resolve， return Promise.resolve(1)
	- .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传
	- 第一个then和第二个then中传入的都不是函数，一个是数字类型，一个是对象类型，因此发生了透传，将resolve(1) 的值直接传到最后一个then里

- 结论
	- **.then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传**

- 运行结果
	- ![题目八运行结果](http://p1.meituan.net/myvideodistribute/68c56ed26f2845300ecba0dc6dc7a3e914382.png)


3.9 题目九

```javascript
Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })
```

- 我们可以先来看看，如果 catch 住了错误，err 会一直链式传递下去被 catch嘛
- ![是否会被一直catch](http://p1.meituan.net/myvideodistribute/f9859062c1341e2e575f952e320aba4222620.png)
	- 一旦 catch 住当前报错，当前报错并不会再往下传递
- ![逐行调用catch是会一直传递下去的](http://p1.meituan.net/myvideodistribute/9846287852a98f322045973bf302c58f24992.png)
	- 逐行调用 then 是会一直传递下去的
- 那我还可以看看，如果没有错误，res 会一直链式传递 then 执行嘛
- ![是否会被一直then](http://p1.meituan.net/myvideodistribute/e2e72158c05ceee7da7528ff9a20348426425.png)
	- 可以看出 then 是会一直往下传递的
- ![逐行调用then 是会一直传递下去的](http://p0.meituan.net/myvideodistribute/abb8ccf3daffdd023ce079c86cafdfd626377.png)
	- 逐行调用 then 是会一直传递下去的

- 分析
	- 代码从上至下开始执行
	- promise 状态改变为 rejected，return 'err!!!'
	- 执行 then，then 中第二个函数，相当于 catch
	- 因此执行
	- console.log('error', err) err --> err!!!

- 运行结果
	- ![题目九运行结果](http://p0.meituan.net/myvideodistribute/05e3b86caaf2b9cbf0c6326020e3385327546.png)


```javascript
Promise.resolve()
  .then(function success (res) {
    throw new Error('error!!!')
  }, function fail1 (err) {
    console.log('fail1', err)
  }).catch(function fail2 (err) {
    console.log('fail2', err)
  })
```

- 分析
	- 代码从上至下开始执行
	- promise 状态变为 resolve，
	- 执行 then
		- throw new Error('error!!!')
	- 被 catch 
		- console.log('fail2', err) err --> error!!!

- 运行结果
	- ![运行结果](http://p0.meituan.net/myvideodistribute/c8643d8fb0fd251145befd28d635ed7e33265.png)

3.10 题目十

```javascript
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })
```

- 分析
	- 代码从上至下开始执行
	- promise 状态变为 resolve，return 1
	- 执行 then
		- console.log(res) res --> return new Promise， resolve(1) 加入微任务队列
	- promise 状态变为 resolve, return 2
		- 执行 finally
			- console.log('finally2')
			- return new Promise， resolve('我是finally2返回的值') 加入微任务队列
	- 当前同步代码执行完成，开始还行微任务队列
		- console.log('finally')
		- console.log('finally2后面的then函数', res) res --> 2

- 结论
	- .finally()方法不管Promise对象最后的状态如何都会执行
	- .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
	- 它最终返回的默认会是一个**上一次的Promise对象值**，不过如果抛出的是一个异常则返回异常的Promise对象。
	- **promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用** 
		
	
- 运行结果
	- ![题目十运行结果](http://p0.meituan.net/myvideodistribute/99d8936b8c5029a6786b464868666f7d47917.png)

	
### Promise 中的 all 和 race

- Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果。
- Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。


4.1 题目一

```javascript
function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    return p
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log(res))
```

- 分析
	- 代码从上至下开始执行
	- Promise.all 入队微任务队列
	- 当前同步代码执行完成，开始执行微任务队列
		- 间隔一秒后，控制台会同时打印出1, 2, 3，还有一个数组[1, 2, 3]
- 结论
	- **有了all，就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据**
	- .all()后面的.then()里的回调函数接收的就是所有异步操作的结果。
	- 而且这个结果中数组的顺序和Promise.all()接收到的数组顺序一致

- 运行结果
	- ![题目一运行结果](http://p0.meituan.net/myvideodistribute/d3a6d5f4f158de806b690af124fcec9431029.png)

	
4.2 题目二

```javascript
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject (x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

- 分析
	- 代码从上至下开始执行
	- Promise.all 入队微任务队列
	- 当前同步代码执行完成，开始执行微任务队列
		- 间隔一秒后，控制台会同时打印出 1, 3
	- 由于 runReject(4) 比 runReject(2) 晚入微任务队列，且 catch 只执行一次
		- 再间隔一秒后
			- console.log(x) x --> 2
			- console.log('Error: 2')
		- 再间隔2秒后
			- console.log(x) x --> 4
			- 不会再执行 catch

- 运行结果
	- ![题目二运行结果](http://p1.meituan.net/myvideodistribute/e0e25426dc0d49c3af9acee68744760d51135.png)

- 等同于
	
	```javascript
	function runAsync (x) {
	  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
	  return p
	}
	function runReject (x) {
	  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
	  return p
	}
	Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
	  .then(res => console.log(res), 
	  err => console.log(err);
	```
- 结论
	- all 和 race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被 then 的第二个参数或者后面的 catch 捕获；但并不会影响数组中其它的异步任务的执行。

4.3 题目三

```javascript
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log('result: ', res))
  .catch(err => console.log(err))
```

- 分析
	- 代码从上至下开始执行
	- Promise.race 入队微任务队列
	- 当前宏任务中同步任务执行完成，开始执行微任务
	- 在间隔时间都一样的情况下，runAsync1 最先加入队列
	- 因此
		- console.log(x) x --> 1
	- 由于 race 的特殊性，只捕捉最先执行完成的那个结果
		- console.log('result: ', res) res --> 1
	- 再
		- console.log(x) x --> 2
		- console.log(x) x --> 3
	- 没有报错，不会被 catch

- 运行结果
	- ![题目三运行结果](http://p0.meituan.net/myvideodistribute/2eda438cd745e39ba934af362a80521038770.png)

4.4 题目四

```javascript
function runAsync(x) {
  const p = new Promise(r =>
    setTimeout(() => r(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));
```

- 分析
	- 代码从上至下开始执行
	- Promise.race 入队微任务队列
	- 当前宏任务中同步任务执行完成，开始执行微任务
	- runReject(0) 最先传入
	- 因此
		- console.log(x) x --> 0
		- console.log(err) err --> Error: 0
	- 间隔小于1秒后
	- runAsync(1), runAsync(2), runAsync(3)
		- 依次为
		- console.log(x) x --> 1
		- console.log(x) x --> 2
		- console.log(x) x --> 3

- 运行结果
	- ![题目四](http://p1.meituan.net/myvideodistribute/89acbf32e7218b90c050526171bd1b3d53719.png)




	
## 参考文献
- [题目来源](https://juejin.im/post/5e58c618e51d4526ed66b5cf)



## 写在后面
- 祝大家多多发财