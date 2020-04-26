---
title: 【未完】react-hooks
date: 2020-04-13 09:37:12
tags: 
- react
categories:
- react
description:
- 记录学习 react-hooks 过程中的思考🤔


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
- Why Hooks?
	- Mixins
		- 命名空间耦合
		- 静态检查
		- 组件参数不清晰
	- HOC
		- 解决命名空间解耦
		- 对 Class 进行静态检查
		- 组件参数不清晰
		- 组件实例增加
	- Hooks
		- 命名空间解耦
		- 静态检查
		- 组件参数清晰
		- 单组件实例
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
		- **useCallback**
			- 将回调函数进行一个缓存，只有在需要时才会返回一个新的事件处理函数
			- useEffect 和 useCallback，现在都有一个约定，回调函数内如果使用了外部闭包中的变量，那么都应该在第二个参数中进行声明
				- eslint-plugin-react-hooks
					- "react-hooks/rules-of-hooks": "error"
						- 确保对hooks的调用，都发生在顶层作用域
					- "react-hooks/exhaustive-deps": "warn"
						- 必须提供 useEffect 和 useCallback 等hooks 的第二个参数，声明回调函数依赖的变量
	- useContext
- 自定义 hooks
- 额外 hooks
	- useReducer
		- [简单项目：使用 Hooks：useReducer 代替 Redux](https://fed.taobao.org/blog/taofed/do71ct/use-the-react-hooks-instead-of-the-redux/?spm=taofed.bloginfo.blog.3.707f5ac8tD5Gxz)
		
			```javascript
			import providers from './providers';
			
			// 数据 Provider 组合器
			const ProvidersComposer = (props) => (
			  props.providers.reduceRight((children, Parent) => (
			    <Parent>{children}</Parent>
			  ), props.children)
			);
			
			const Provider = (props) => {
			  return (
			    <ProvidersComposer providers={providers}>
			      {props.children}
			    </ProvidersComposer>
			  );
			};
			
			export default Provider;
			```
	- useCallback
	- useMemo
	- useRef
	- useImperativeHandle
	- useLayoutEffect
	- useDebugValue

	
## react-hooks 改写 TO DO Lists


## 写在后面
- 祝大家多多发财
