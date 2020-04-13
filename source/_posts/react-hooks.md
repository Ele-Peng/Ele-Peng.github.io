---
title: react-hooks
date: 2020-04-13 09:37:12
tags: 
- 前端概念
categories:
- 前端概念
description:
- 记录学习 react-hooks 过程中的思考🤔


---

## 写在前面
- 记录学习 react-hooks 过程中的思考🤔
<!-- more -->

## 主要概念
- react 16.8 推出
- 能够在函数组件内部使用 state 和组件生命周期方法
- 定义组件
	- class
	- F(x) + react-hooks(灵活、可测试、代码复用)
- 什么是 hooks ?
	- 允许你hook一些业务逻辑到组件内部 state 和 render 函数上
	- hooks 允许我们去操作这个内部state了
	- 更好的去关注分离和代码复用(传统 HOC，函数作为子组件)，将相关代码
- 三个基础 hooks
	- useState
		- 允许操作组件的内部状态
		- 如果要根据之前的状态决定下一个状态
			- 参数可以写成一个函数，函数接受的参数就是之前的状态，prevState => nowState
	- useEffect
		- 使用副作用
		- 指定一个函数在每次render完，去执行什么样的逻辑
		- 第二个参数，传入一个数组，这个数组是当前闭包中的任何变量
			- 只有当数组中的发生变化，才会调用回调函数
			- 函数组件内部，很容易监听props变化
		- 可以在 useEffect 回调函数中，返回一个函数，作为组建销毁时的一个回调，允许执行一些资源回收的逻辑
	- useCallback
		- 将回调函数进行一个缓存，只有在需要时才会返回一个新的事件处理函数
	- useEffect 和 useCallback，现在都有一个约定，回调函数内如果使用了外部闭包中的变量，那么都应该在第二个参数中进行声明
		- eslint-plugin-react-hooks
			- "react-hooks/rules-of-hooks": "error"
				- 确保对hooks的调用，都发生在顶层作用域
			- "react-hooks/exhaustive-deps": "warn"
				- 必须提供 useEffect 和 useCallback 等hooks 的第二个参数，声明回调函数依赖的变量
- 自定义 hooks
- 额外7个内置 hooks
	- useReducer
	- useContext
## 写在后面
- 祝大家多多发财
