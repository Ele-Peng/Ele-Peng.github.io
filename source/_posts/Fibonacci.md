---
title: Fibonacci
date: 2020-08-26 23:50:42
tags: 
- writing
- 算法
categories:
- 算法
description:
- 算法


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
- [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number)
- 斐波那契数列特点：
	-  F<sub>0</sub> = 0,F<sub>1</sub> = 1;
	-  F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>;
	-  such as:
		- 0, 1, 1, 2, 3, 5, 8, 13, 21 ...

<!-- more -->

## 基础实现：递归实现

```javascript
// 递归 Time: O(2^n) Space: O(1)
function fibonacci(n) {
  if (n <= 1) {
    return Math.max(n, 0);
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```


## 初级实现：简单 for 循化实现


```javascript
// 循环 Time: O(n) Space: O(n)
function fibonacci(n) {
  if (n <= 1) {
    return Math.max(n, 0);
  }
  let res = [0, 1]
  for (let i = 2; i < n; i ++) {
    res.push(res[i - 1] + res[i - 2])
  }
  return res[n - 1];
}
```
	
## 中级实现：简单 for 循化实现


```javascript
// 递归优化，跳过计算过的中间变量 Time: O(n) Space: O(n)
// {
  let res = [0]
  function fibonacci(n) {
    if (n <= 1) {
      return res[n] = Math.max(n, 0);
    }
    if (res[n]) {
      return res[n];
    }
    res[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return res[n]
  }
  // 求数组第十项的值
  fibonacci(9)
// }
```	

## 高级实现：矩阵乘法 + 快速幂

## 写在后面
- 祝大家多多发财


