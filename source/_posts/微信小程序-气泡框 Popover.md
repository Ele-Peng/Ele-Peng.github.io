---
layout: 微信小程序-气泡框
title: 微信小程序-气泡框
date: 2020-04-05 11:47:05
tags: 
- 微信小程序
categories:
- 微信小程序
description:
  - 记录基于[微信小程序-气泡框](https://developers.weixin.qq.com/community/develop/doc/000e4e7103c3c090e517e0cdb5b806)实现中产生的问题及思考

---

##  写在前面
- 记录基于[微信小程序-气泡框](https://developers.weixin.qq.com/community/develop/doc/000e4e7103c3c090e517e0cdb5b806)实现中产生的问题及思考
- - -
## 问题截图
![popover问题截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzlkMGY1NmUxOTVkNzFjMjAyYzVkYzI0OGMxMzg0NmUxMTQ3MTQucG5n?x-oss-process=image/format,png)
## 问题描述
- 模拟器显示正常，但在真机上点击后，气泡框的箭头并没有消失，且点击同一级别区域，能利用覆盖消除箭头。【是不是一个很可爱的bug？
<!-- more -->

## 问题解决过程记录
- 定位问题发生的原因范围
	- 样式
		- 样式在判断显示条件(wx:if="{{visible}}")生效后，仍然渲染
		- 否定原因
			- 查询代码发现，整个样式背景的设定是在::before伪元素选择器中
			- 且显示条件生效，在调试器中已没有该元素，但仍显示
	- 逻辑
		- 会不会是组件在渲染时，多渲染一份，我们使用判断条件进行开关时，只是对其中一个进行了操作
		- 怀疑依据
			- ![popover问题依据截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzk5ZjcwMDAwZmViM2IwYzc0MWJmNjFiYzE5YTUwMDIxMjYyMTI3LnBuZw?x-oss-process=image/format,png)
			- 上图可见：在popover组件下，有2个通过&lt;slot&gt;插入的相同内容

- 开始解决问题
	- 查询官方关于[slot](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)方面的介绍
		- ![官方slot基础例子](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2JjMTE0ZmI0YTdhOWZkY2ZlYzU3ZDE5ZWQyYWY0YzI3MzE1NTU4LnBuZw?x-oss-process=image/format,png)
	- 基于官方基础代码，复现问题
		- 产生一个child-tag组件，并在其中编写
			```javascript
			// components/child-tag.js.js
			Component({
			  options: {
			    multipleSlots: true // 在组件定义时的选项中启用多slot支持
			  },
			  /**
			   * 组件的属性列表
			   */
			  properties: {
			
			  },
			  relations: {
			    './component-tag-name': {
			      type: 'parent',
			    }
			  },
			
			  /**
			   * 组件的初始数据
			   */
			  data: {
			
			  },
			
			  /**
			   * 组件的方法列表
			   */
			  methods: {
			
			  }
			})
			```
		- 与component-tag-name绑定形成父子组件
			```javascript
			// components/component-tag-name.js
			Component({
			  options: {
			    multipleSlots: true // 在组件定义时的选项中启用多slot支持
			  },
			  relations: {
			    './child-tag': {
			      type: 'child',
			    }
			  },
			  /**
			   * 组件的属性列表
			   */
			  properties: {
			  },
			
			  /**
			   * 组件的初始数据
			   */
			  data: {
			    visible: false
			  },
			
			  /**
			   * 组件的方法列表
			   */
			  methods: {
			  
			  }
			})
			```
		- 并将index.html中进行调用
			```html
			<!-- 引用组件的页面模版 -->
			<view>
			  <button type="primary" bindtap="onTap">222</button>
				<my-component id="component">
					<view slot="content">
						这里是插入到组件slot name="content"中的内容
						<child-component>
							<view slot="child">这里是插入到组件slot name="child"中的内容</view>
						</child-component>
					</view>
				</my-component>
			</view>
			```
		- 但是其结构树仍然非常正常，并没有出现那个所谓的"拷贝"组件
			- ![改写v1.1后的结构树截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzcwNTRhNjJkYmM2MGEyNmU5ZGI1ODYzNzNjOGY2OTgyMzg3NTI0LnBuZw?x-oss-process=image/format,png)
			- 仔细复现了几次，发现：多出来的那个组件会有所延迟。抓住这个问题，想到我们在onReady中，注册了该组件，于是，继续模拟
		- 修改index.js代码，并在component-tag-name组件注册onTap方法，控制显隐
			```javascript
			  onReady() {
			    this.component = this.selectComponent('#component')
			  },
			  onTap() {
			    console.log('onTap')
			    wx.createSelectorQuery().select('#component').boundingClientRect(res => {
			        // 调用自定义组件 popover 中的 onDisplay 方法
			        this.component.onTap();
			    }).exec();
			  }
				```
		- 最终复现
			- ![官方模拟最终运行截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzhmZjQ3OTNhMjUwYTNjMzlhYjBlOGQxMGJhYTllZmI2NDc1NjIyLnBuZw?x-oss-process=image/format,png)
	- 得出问题来源：
		- 在组件中进行了一次setData
	- 思考背后问题
		- 在组件中setData为什么会”拷贝“一份相同的在页面级wxml中？
		- 猜想一：从[WXS响应事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html#%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88)中，我隐隐得到了答案
		- ![wxs相应事件](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzZlYWJjYjdjOTliMzAxNWMwOGQwZmM2YWM3ZmMxMGMzNDU5NDAxLnBuZw?x-oss-process=image/format,png)
		- 我们在页面级通过selectComponent实例化组件，对选中的组件进行操作，官方可以通过拷贝一份相同的组件，使我们便捷的将事件的处理从2次的逻辑层和渲染层通信以及一次渲染，减少到直接对页面上元素进行操作，即一次逻辑层和渲染层通信以及一次渲染。
		- 猜想二：问题层面是在微信开发者工具中的wxml，渲染方式对于这种情况就是这样处理的。
- 官方已给出问题原因
	- ![wxml面板](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzJkMWVkZmYyNWIwM2YxZDU2ZGVjYjZhM2NkYjAwMGU5NTE5ODQucG5n?x-oss-process=image/format,png)

## 如何解决问题
- 在popover以及popover-item加入
	```javascript
	options: {
			    multipleSlots: true // 在组件定义时的选项中启用多slot支持
			  },
	```
- 就可以解决了。最后建议slot中可以写上name这样代码可能会更易读。
##  写在后面
- 祝大家多多发财
---