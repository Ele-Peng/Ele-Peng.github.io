---
layout: 微信小程序-fix
title: canvas原生组件最顶层
date: 2020-04-05 12:04:24
tags: 
- 微信小程序
categories:
- 微信小程序


---

#### 写在前面
- 大家应该都知道过，在微信小程序中，canvas等原生组件的层级是最高的，页面中无论你设置多大的z-index都无法覆盖在其之上，这就可能会产生一些问题
- 就像这样
	- ![canvas顶层问题截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2UxYmQ5OTM2M2VkYjU1NTRmYjc5MzBlZDllMTA0ZjEwMTc2MDM0LnBuZw?x-oss-process=image/format,png)
	- 柱状图是用canvas画的，它置于了我的tooltip之上。【这看起来真是一个可怕的问题
---

#### 解决问题
- 微信官方提供了[cover-view](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html)原生组件，覆盖在原生组件之上的文本视图
- 微信官方提供了将canvas转化为图片的方式--[wx.canvasToTempFilePath](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html)，这样就可以”降级“


##### 方法一：cover-view
- 将tooltip用cover-view改写，效果如下
	- ![cover-view version0.1 截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2Y0MTZjZjhlMjNiZWEwMjNjYTM1M2JhOGExMDM1MDM2MzYyOTIucG5n?x-oss-process=image/format,png)
	- 看上去，是解决了我们的问题，且tooltip后的灰色背景不能滑动了，【妈耶，好棒！
	- 但是，这产生了一个：**当文本超出tooltip宽度时，scroll-y: auto，失效了，溢出部分被直接截取**
	- 罪魁祸首就是它
		- ![cover内置样式](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2M5ZDljYjZiZTQ0ZGY3YmJmNmRlMjAxNDM1ZmYzOTJjNDMxNDMucG5n?x-oss-process=image/format,png)
	- 那我们可以：
		- 在tooltip分段内容中加上
			```css
			.modal-layer-content-rule {
			    white-space: pre-wrap;
			}
			```
		- 在内容wrapper中加上
			```css
			.modal-layer-content {
			    overflow: scroll;
			}
			```
	- 完美解决
		- ![cover-view解决图](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2FhZjRkMDAyODdjZGI4M2Y0NWRhMGVkOTg3Mzc5MGNhNDQxMjkucG5n?x-oss-process=image/format,png)
##### 方法二：wx.canvasToTempFilePath
- 首先我们要做的就是将网络图片绘制进canvas，官方关于canvas类型有两种
![两种canvas类型](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2E4ZjJmNjA5OGYxNmQ4MzY3NWJiN2I3OWY0ZDM1NWM1MTAwMDg3LnBuZw?x-oss-process=image/format,png)
- 新canvas 2D接口尝试
	```javascript
	const query = wx.createSelectorQuery().in(this)
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const img = canvas.createImage()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 100, 100)
        }
        img.src = 'https://p0.meituan.net/myvideodistribute/0990cc2062e81ab6cc11fd8690f8755042005.jpg'
        // 这种方式获取canvas区域隐含的像素数据
        console.log(ctx.getImageData(0, 0, 150, 100).data)
      })
	```
	```html
	<canvas type="2d" id="myCanvas" canvas-id="myCanvas"></canvas>
	```
- 运行截图![canvas2d 运行截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzE5ZWE3ZGYxYjg2ODUzOWFhNzVhY2E0OTAxYzI2MzU2OTk4NDYucG5n?x-oss-process=image/format,png)
- 第二种旧canvas
	```javascript
	const ctx = wx.createCanvasContext('myCanvas')
    wx.getImageInfo({
        src: 'https://p0.meituan.net/myvideodistribute/0990cc2062e81ab6cc11fd8690f8755042005.jpg',
        success: function (res) {
          console.log('res', res)
          const poster = res.path                                  
          ctx.drawImage(poster, 0, 0, 150, 100)
          ctx.draw()
        }
      })
      // 这种方式获取canvas区域隐含的像素数据
      wx.canvasGetImageData({
        canvasId: 'myCanvas',
        x: 0,
        y: 0,
        width: 150,
        height: 100,
        success(res) {
          console.log(res.width) // 150
          console.log(res.height) // 100
          console.log(res.data instanceof Uint8ClampedArray) // true
          console.log(res.data) // 150 * 100 * 4
          console.log(res.data.length) // 150 * 100 * 4
        }
      })
	```
	```html
	<canvas id="myCanvas" canvas-id="myCanvas"></canvas>
	```
- 运行截图![旧canvas](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzU4NTg5MzQ4MDc3Njk3OTA0OTRmZmIzOWRiNDdjMWRmNjk4ODQucG5n?x-oss-process=image/format,png)
- 虽然两种方法，都能实现将网络图片绘制进canvas，但新版的进行了createImage，将其打印的话，其实就是新建了一个img标签，并将img标签的东西绘制进canvas
	- ![img console](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlLzFjMjE1NzMzZTRkY2UzNGZiNzI4NDFhZWEyMDc0ZWIwMjQ1OTQucG5n?x-oss-process=image/format,png)
	- 为什么微信官方会仅支持以下方式进行新版canvas2d 图片的绘制，考虑是什么？
	- ![经典报错](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2JhYWQ1OWRhNDI4M2FjZmViZTY1NGQ0ZWZiNTAxZDZlMjAxMjE2LnBuZw?x-oss-process=image/format,png)
- 现在我们要将canvas的内容导成图片，同样分成新旧两版
- 主要思路都是：在wxml中，如果canvas绘制图片没有完成，则显示canvas内容，绘制完成后，就利用canvasToTempFilePath，将图层内容生成指定大小图片，显示image
	- canvas2d 
		```javascript
		const that = this
	    const query = wx.createSelectorQuery().in(this)
	    query.select('#myCanvas')
	      .fields({ node: true, size: true })
	      .exec((res) => {
	        const canvas = res[0].node
	        const ctx = canvas.getContext('2d')
	        const img = canvas.createImage()
	        console.log('img', img)
	        img.onload = () => {
	          ctx.drawImage(img, 0, 0, 100, 100)
	            wx.canvasToTempFilePath({
	              x: 0,
	              y: 0,
	              width: 100,
	              height: 100,
	              destWidth: 100,
	              destHeight: 100,
	              canvas: canvas,
	              success(res) {
	                that.setData({
	                  imgPath: res.tempFilePath
	                })
	              },
	              fail(err) {
	                console.log('err', err)
	              }
	            })
	        }
	        img.src = 'https://p0.meituan.net/myvideodistribute/0990cc2062e81ab6cc11fd8690f8755042005.jpg'
	        // 这种方式获取canvas区域隐含的像素数据
	        console.log(ctx.getImageData(0, 0, 100, 100).data)
	      })
		```
		```html
		<canvas wx:if="{{!imgPath}}" type="2d" id="myCanvas" canvas-id="myCanvas" style="width: 330px;height: 340px;"></canvas>
		<image wx:else src="{{imgPath}}" style="width: 330px;height: 340px;" />
		```
		- canvas2d 需要踩得坑是：它的官方文档🙃
			- ![canvas2d 转图片误导](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2UwM2Q1ZDg0YzYyNmI0NzlmZjBjOTlmNzA1YmRhYjg5NDc5MjcucG5n?x-oss-process=image/format,png)
			- 尝试下来，会
				- ![ctx.draw报错](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2UxMjRiY2Q3ZmNjYWI5ODBlNDdkMTk2YTMyZGQyODI4NDUzODcucG5n?x-oss-process=image/format,png)
			- 那我们可以继续往下看
				- ![canvas2d tempath正确实力](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2YxODk5NWFiNDY4N2IwYmZlYzhjZTZkZWU2ZWQxYmZjMTA1MTY1LnBuZw?x-oss-process=image/format,png)这才是符合我们需要
		- 运行截图
			- ![canvas2d运行截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AxLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2JmMzVlMzY4YzRjMmRhYTgxNTA0NzM0YTIxZGMxM2I2NDYwNzIucG5n?x-oss-process=image/format,png)
	- 旧版canvas
		```javascript
	    const ctx = wx.createCanvasContext('myCanvas')
	    const that = this
	    wx.getImageInfo({
	      src: 'https://p0.meituan.net/myvideodistribute/0990cc2062e81ab6cc11fd8690f8755042005.jpg',
	      success: function (res) {
	        console.log('res', res)
	        const poster = res.path
	        ctx.drawImage(poster, 0, 0, 150, 100)
	        ctx.draw(false, () => {
	          wx.canvasToTempFilePath({
	            x: 0,
	            y: 0,
	            width: 100,
	            height: 100,
	            destWidth: 100,
	            destHeight: 100,
	            canvasId: "myCanvas",
	            success(res) {
	              that.setData({
	                imgPath: res.tempFilePath
	              })
	              console.log(res.tempFilePath)
	            },
	            fail(err) {
	              console.log('err', err)
	            }
	          })
	        })
	        // 这种方式获取canvas区域隐含的像素数据
	        wx.canvasGetImageData({
	          canvasId: 'myCanvas',
	          x: 0,
	          y: 0,
	          width: 150,
	          height: 100,
	          success(res) {
	            console.log(res.width) // 150
	            console.log(res.height) // 100
	            console.log(res.data instanceof Uint8ClampedArray) // true
	            console.log(res.data) // 150 * 100 * 4
	            console.log(res.data.length) // 150 * 100 * 4
	          }
	        })
	      }
	    })
		```
		```html
		<canvas wx:if="{{!imgPath}}" id="myCanvas" canvas-id="myCanvas" style="width: 330px;height: 340px;"></canvas>
		<image wx:else src="{{imgPath}}" style="width: 330px;height: 340px;" />
		```
		- 运行截图
			- ![旧版canvas运行截图](https://imgconvert.csdnimg.cn/aHR0cDovL3AwLm1laXR1YW4ubmV0L215dmlkZW9kaXN0cmlidXRlL2EzZTRiYTBkYzc2NDgzYTM1NTYxZDcwNDUzNzZkNjZmNDU5MTgucG5n?x-oss-process=image/format,png)
#### 写在后面
- 感谢[Skady宝贝](https://github.com/skadieyes)在探讨问题中给予的帮助，欢迎大家去github找她玩👈
- 祝大家多多发财
----
		
