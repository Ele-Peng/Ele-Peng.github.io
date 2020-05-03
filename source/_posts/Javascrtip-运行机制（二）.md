---
title: Javascript-运行机制（二）
date: 2020-05-02 22:10:38
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
- 嗯，发现 运行机制 的面试题是真的多。。😓
- 那这就是，最末篇吧
- 加油 Elle 🤦‍♀️
- 五一倒计时 2 天

<!-- more -->

## 实践记录

### async / await 

5.1 题目一

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')
```

- 分析
	- 代码从上至下开始执行
	- 执行同步代码
	- async1();
		- console.log("async1 start");
		- await async2();
			- 等待执行 async2 结果
			- console.log("async2");
		- console.log("async1 end"); 入队微任务队列
	- console.log('start')
	- 当前宏任务中的所有同步代码执行完毕，开始执行当前宏任务中的微任务队列 
	- console.log("async1 end");

	
- 结论
	- 在这里，可以理解为「紧跟着await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中」

- 等同于
	
	```javascript
	async function async1() {
	  console.log("async1 start");
	  // 原来代码
	  // await async2();
	  // console.log("async1 end");
	  
	  // 转换后代码
	  new Promise(resolve => {
	    console.log("async2")
	    resolve()
	  }).then(res => console.log("async1 end"))
	}
	async function async2() {
	  console.log("async2");
	}
	async1();
	console.log("start")

	```


- 运行结果
	- ![题目一运行结果](http://p1.meituan.net/myvideodistribute/f08b1b409f667c37f2a9dae1bf0b491e36782.png)

5.2 题目二

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  setTimeout(() => {
    console.log('timer')
  }, 0)
  console.log("async2");
}
async1();
console.log("start")
```

- 分析
	- 代码从上至下开始执行
	- async1();
		- 执行同步代码
		- console.log("async1 start");
		- await async2();
			- setTimeout ... 入队宏任务队列
			- console.log("async2");
		- console.log("async1 end"); 入队微任务队列
	- console.log("start")
	- 当前宏任务中的同步代码执行完成，开始执行微任务队列
		- console.log("async1 end");
	- 第一个宏任务执行完成，开始执行下一个宏任务
	- console.log('timer')

- 运行结果
	- ![题目二运行结果](http://p0.meituan.net/myvideodistribute/ef5bbc4448d8cf8a4e6e7eb3d481257d43632.png)

	
5.3 题目三

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")
```

- 分析
	- 代码从上至下开始执行
	- async1();
		- console.log("async1 start");
		- await async2();
			- setTimeout ... 入队宏任务队列
			- console.log("async2");
		- console.log("async1 end"); 入队微任务队列
		- setTimeout ... 入队微任务队列
	- setTimeout ... 入队宏任务队列
	- console.log("start")
	- 当前宏任务中的同步代码已经执行完成，开始执行微任务
	- console.log("async1 end");
	- setTimeout ... 入队宏任务队列
	- 当前宏任务执行完成，开始执行下一个宏任务
	- console.log('timer2');
	- 当前宏任务执行完成，开始执行下一个宏任务
	- console.log('timer3')
	- 当前宏任务执行完成，开始执行下一个宏任务
	- console.log('timer1')

- 运行结果
	- ![题目三运行结果](http://p0.meituan.net/myvideodistribute/40ff5c3620b6ef956afd99a895080cee58816.png)


5.4 题目四

```javascript
async function fn () {
  // return await 1234
  // 等同于
  return 123
}
fn().then(res => console.log(res))
```

- 分析
	- 代码从上至下开始执行
	- fn()
		- return 123
	- console.log(res) res --> 123

- 运行结果
	- ![题目四运行结果](http://p1.meituan.net/myvideodistribute/01d7e322293346a15fd0c97cb6167dee21159.png)

5.5 **题目五**

```javascript
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
```

- 分析
	- 代码从上至下开始执行
	- console.log('srcipt start')
	- async1()
		- console.log('async1 start');
		- new Promise ... 等待执行
			- console.log('promise1')
			- 由于 promise 并没有 resolved、rejected，所以一直处在 pending 状态，所以 会一直 await ，await 后的内容也包括 async1 后面的 then，都不会执行
	- console.log('srcipt end')

- 运行结果
	- ![题目五运行结果](http://p0.meituan.net/myvideodistribute/6da017ef5e2bef76433a90be0f7804c343869.png)

5.6 题目六

```javascript
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(res))
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
```

- 分析
	- 代码从上至下开始执行
	- console.log('srcipt start')
	- async1()
		- console.log('async1 start');
		- await new Promise ... 等待 promise 执行
			- console.log('promise1')
			- 其中 promise 状态变为 resolved，将其状态保存起来
			- new Promise then ... 加入微任务队列
		- console.log('async1 success'); 入队微任务队列
		- return 'async1 end'
	- async1().then ... 入队微任务队列
	- console.log('srcipt end')
	- 当前宏任务中的同步代码执行完成，开始执行微任务队列
	- .then(res => console.log(res))
		- res --> promise1 resolve
	- console.log('async1 success'); 
	- res => console.log(res) res --> 'async1 end'


- 运行结果
	- ![题目六运行结果](http://p0.meituan.net/myvideodistribute/478ab1a6c972bd17dab664ba479c1c2859767.png)


5.7 题目七

```javascript
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise resolve')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => {
  console.log(res)
})
new Promise(resolve => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer')
  })
})
```

- 分析
	- 代码从上至下开始执行
	- console.log('srcipt start')
	- async1()
		- console.log('async1 start');
		- await new Promise ...
			- console.log('promise1')
			- 其中 promise 状态变为 resolve，将其保存起来
		- console.log('async1 success'); 入队微任务队列
		- return 'async1 end'
	- async1().then ... 入队微任务队列
	- new Promise，执行该构造函数代码
		- console.log('promise2')
		- setTimeout ... 加入宏任务队列
	- 当前宏任务中的同步代码执行完，开始执行微任务
	- console.log('async1 success');
	- console.log(res) res --> 'async1 end'
	- 当前宏任务执行完成，开始执行下一个宏任务
	- console.log('timer')

- 运行结果
	- ![题目七运行结果](http://p0.meituan.net/myvideodistribute/59c38ec9bef1877e27b64b056fd9258663945.png)

5.8 题目八

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log('script end')
```

- 分析
	- 代码从上至下开始执行
	- console.log("script start");
	- setTimeout ... 入队宏任务队列
	- async1()
		- console.log("async1 start");
		- await async2();
			- console.log("async2");
		- console.log("async1 end"); 入队微任务队列
	- new promise，执行该构造函数
		- console.log("promise1");
		- 其中 promise 状态改变为 resolve，将其保存
	- new promise then ... 入队微任务队列
	- console.log('script end')
	- 当前宏任务中的同步代码执行完成，开始执行微任务
	- console.log("async1 end");
	- new Promise then ... 
		- console.log("promise2");
	- 当前宏任务执行完成，开始执行下一个宏任务
		- console.log("setTimeout");

- 运行结果
	- ![题目八运行结果](http://p0.meituan.net/myvideodistribute/05bcc26014cb3a56f1da38df3e28141974246.png)

5.9 题目九

```javascript
async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSometing();
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
  console.log("promise start...");
  resolve("promise");
});
promise.then(val => console.log(val));

console.log("test end...");
```

- 分析
	- 代码从上至下开始执行
	- test()
		- console.log("test start...");
		- await testSometing()
			- console.log("执行testSometing");
			- "testSometing";
			- const v1 = "testSometing";
		- console.log("testSometing"); 入队微任务队列
		- await testAsync() 入队微任务队列
		- console.log(v2); 入队微任务队列
		- console.log(v1, v2); 入队微任务队列
		- new Promise, 执行该构造函数代码
			- console.log("promise start...");
			- 其 promise 状态变为 resolve,将其保存
		- promise.then ... 入队微任务队列
		- console.log("test end...");
		- 当前宏任务中的同步代码执行完成，开始执行微任务
			- console.log("testSometing"); v1 --> "testSometing"
			- await testAsync() 
				- console.log("执行testAsync");
				- return Promise.resolve("hello async");
				- Promise.resolve("hello async") ... 入队微任务队列
			- console.log(v2); ... 重新入队微任务队列
			- console.log(v1, v2); 重新入队微任务队列
			- promise.then ... 
				- console.log(val) val --> promise
			- Promise.resolve("hello async") return "hello async"
			- v2 = "hello async"
			- console.log(v2);
			- console.log("hello async");
			- console.log(v1, v2);
				- console.log("执行testAsync", "hello async");



- 运行结果
	- ![题目九运行结果](http://p0.meituan.net/myvideodistribute/09e8b0ae4cadad1f803049e6545d73f091754.png)

	

### async 处理错误
6.1 **题目一**

```javascript
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))
```

- 分析
	- 代码从上至下开始执行
	- async1()
		- await async2();
			- new Promise，执行该构造函数
				- console.log('async2')
				- reject('error') promise 状态变为 reject,将其保存起来，并向上抛
				- Promise {<rejected>: "error"}

- 运行结果
	- ![题目一运行结果](http://p1.meituan.net/myvideodistribute/b3955dc674cf405c9a60de9062b525c736256.png)

	
6.2 题目二

```javascript
async function async1 () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
```

- 分析
	- 代码从上至下开始执行
	- async1()
		- Promise.reject('error!!!')
			- promise 状态变为 reject，将其状态保存起来，向上抛错
		- catch 错误 入队微任务队列
		- console.log('async1'); 入队微任务队列
		- return Promise.resolve('async1 success')
	- async1().then ... 入队微任务队列
	- console.log('script start')
	- 当前宏任务中的同步代码执行完成，开始执行微任务
	- console.log(e) e --> 'error!!!'
	- console.log('async1');
	- console.log(res) res --> 'async1 success'

- 运行结果
	- ![题目二运行结果](http://p0.meituan.net/myvideodistribute/fc960e772e0fbca1fdf8640c8774999640316.png)


### 综合题

7.1 题目一

```javascript
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);
```

- 分析
	- 代码从上至下开始执行
	- first()
		- return 一个 promise 对象。先执行 new Promise，该构造函数代码
		- console.log(3);
		- resolve(2)
			- 该 promise 状态变为 resolved，保存起来
		- p new Promise, 执行该构造函数代码
			-  console.log(7);
			-  setTimeout ... 入队宏任务队列
			-  resolve(1);
			-  该 promise 状态变为 resolve ,保存起来
		- p.then ... 入队微任务队列
	- first().then ... 入队微任务队列
	- 执行同步代码
		- console.log(4);
	- 该宏任务中的同步代码都执行完成，开始执行微任务队列
	- p.then
	- console.log(arg) arg --> 1
	- p.then 入队微任务队列
	- console.log(arg) arg --> 2
	- 当前宏任务中的代码都执行完成，开始执行下一个宏任务
	- setTimeout ...
		- console.log(5);
		- resolve(6); promise p 的状态已经改变，无法再进行更改，所以该行代码，无效
		- console.log(p) p --> 1

- 运行结果
	- ![题目一运行结果](http://p0.meituan.net/myvideodistribute/de321f1169135bf57ef98b6dd3346ada56428.png)


7.2 题目二

```javascript
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
```

- 分析
	- 代码从上至下开始执行
	- console.log('script start');
	- async1()
		- console.log('async1');
		- setTimeout ... 2000入队宏任务队列
		- await new Promise
			- 执行该构造函数代码
				- console.log('promise1')
		- 由于该 promise 没有被 resolve、reject，一直处在 pending，因此 后面的
			- console.log('async1 end') 入队微任务队列
			- return 'async1 success'
			- 均不执行
	- async1().then ... 入队微任务队列
	- console.log('script end');
	- Promise.resolve(1)
		- 该 promie 状态变为1，保存起来
	- Promise.resolve(1).then ... 入队微任务队列
	- setTimeout ... 1000入队宏任务队列
	- 当前宏任务中的同步代码执行完成，开始执行微任务
	- Promise.resolve(1).then ... 
		- 由于 .then(2) .then(Promise.resolve(3)) .catch(4) 一个是数字，一个是对象，会发生值透传现象
		- console.log(res) res --> 1
	- 当前宏任务执行完成，开始执行下一个宏任务
	- setTimeout ... 1000
		- console.log('timer2')
	- setTimeout ... 2000
		- - console.log('timer1')

- 运行结果
	- ![题目二运行结果](http://p0.meituan.net/myvideodistribute/18d87ace8b51f98e4e30f55c17d0c4ff93076.png)

7.3 题目三

```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})
```

- 分析
	- 代码从上至下开始执行
	- new Promise，执行该构造函数代码
		- setTimeout ... 入队宏任务队列
		- resolve('resovle1');
		- promise 状态变为 resolve1，并保存起来
	- Promise.then ...
		- console.log(res) res --> 'resovle1'
		- setTimeout ... 入队宏任务队列
	- Promise.finally ...
		- console.log('finally', res) res --> undefined
	- 当前宏任务中的代码全部执行完成，开始执行下一个宏任务
	- resolve('resolve3'); promise 状态一旦改变，无法更改
	- console.log('timer1')
	- 当前宏任务中的代码全部执行完成，开始执行下一个宏任务
	- console.log(p1) p1 --> .finally的返回值 --> undefined

- 结论
	- **finally 不管 Promise 的状态是 resolved 还是 rejected 都会执行，且它的回调函数是接收不到 Promise 的结果的**，所以 finally() 中的 res 是一个迷惑项
	
- 运行结果
	- ![题目三运行结果](http://p0.meituan.net/myvideodistribute/7be692142d758f1d65ad549a1b106f4146102.png)

	
## 参考文献
- [题目来源](https://juejin.im/post/5e58c618e51d4526ed66b5cf)
				
				
## 写在后面
				
- 祝大家多多发财