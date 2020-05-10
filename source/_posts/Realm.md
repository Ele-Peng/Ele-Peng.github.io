---
title: Realm
date: 2020-05-08 09:45:15
tags:
- 前端概念
categories:
- 前端概念
description:
- Javascript -- Realm
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

- Before it is evaluated, all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources.

<!-- more -->

- 从逻辑上讲，堆栈中的每个上下文总是与其 realm 相关联
	- 让我们看看单独的realm的例子，使用vm模块：
	
		```javascript
		const vm = require('vm');
		
		// First realm, and its global:
		const realm1 = vm.createContext({x: 10, console});
		
		// Second realm, and its global:
		const realm2 = vm.createContext({x: 20, console});
		
		// Code to execute:
		const code = `console.log(x);`;
		
		vm.runInContext(code, realm1); // 10
		vm.runInContext(code, realm2); // 20
		```
	- ![realm](http://p0.meituan.net/myvideodistribute/5055c18e52edec4cd447d7acfd4a8278158263.png)


## 实践记录

- JavaScript 中所有的固有对象

	```javascript
	

    let objects = [
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "Array",
      "Date",
      "RegExp",
      "Promise",
      "Proxy",
      "Map",
      "WeakMap",
      "Set",
      "WeakSet",
      "Function",
      "Boolean",
      "String",
      "Number",
      "Symbol",
      "Object",
      "Error",
      "EvalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Uint8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8ClampedArray",
      "Atomics",
      "JSON",
      "Math",
      "Reflect"
    ];

    const set = new Set();

    const globalObject = []

    for (let i of objects) {
      globalObject.push({
        object: this[i],
        path: [i]
      })
    }

    while (globalObject.length) {
      const current = globalObject.shift()
      console.log(current.path.join('.'))
      if (set.has(current.object))
        continue;
      set.add(current.object)



      let proto = Object.getPrototypeOf(current.object)
      if (proto) {
        globalObject.push({
          path: current.path.concat(["__proto__"]),
          object: proto
        })
      }

      for (let p of Object.getOwnPropertyNames(current.object)) {
        let d = Object.getOwnPropertyDescriptor(current.object, p)
        if (d.hasOwnProperty("value") && ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) && d.value instanceof Object) {
          globalObject.push({
            path: current.path.concat([p]),
            object: d.value
          })
        }
        if (d.hasOwnProperty("get") && typeof d.get === "function") {
          globalObject.push({
            path: current.path.concat([p]),
            object: d.get
          })
        }
        if (d.hasOwnProperty("set") && typeof d.set === "function") {
          globalObject.push({
            path: current.path.concat([p]),
            object: d.set
          })
        }
      }
    }
	```
	
- 根据上述代码，进行数据结构方面的格式化
	
	```javascript
	
    const objects = [
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "Array",
      "Date",
      "RegExp",
      "Promise",
      "Proxy",
      "Map",
      "WeakMap",
      "Set",
      "WeakSet",
      "Function",
      "Boolean",
      "String",
      "Number",
      "Symbol",
      "Object",
      "Error",
      "EvalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Uint8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8ClampedArray",
      "Atomics",
      "JSON",
      "Math",
      "Reflect"
    ];

    const set = new Set();

    const globalObject = {
      id: "Global Object",
      children: [

      ]
    }

    for (let i of objects) {
      globalObject.children.push({
        children: [],
        id: i
      })
    }


    for (let i = 0; i < objects.length; i++) {
      const current = objects[i]
      if (set.has(objects[i]))
        continue;
      set.add(objects[i])
      for (let p of Object.getOwnPropertyNames(window[objects[i]])) {
        let d = Object.getOwnPropertyDescriptor(window[objects[i]], p)
        if (d.hasOwnProperty("value") && ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) && d.value instanceof Object) {
          let childrenThird = []
          for (let k of Object.getOwnPropertyNames(d.value)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({ id: k })
            }
          }
          globalObject["children"][i].children.push({
            children: childrenThird,
            id: p
          })
        }
        if (d.hasOwnProperty("get") && typeof d.get === "function") {
          let childrenThird = []
          for (let k of Object.getOwnPropertyNames(d.get)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({ id: k })
            }
          }
          globalObject["children"][i].children.push({
            children: childrenThird,
            id: p
          })
        }
        if (d.hasOwnProperty("set") && typeof d.set === "function") {
          let childrenThird = []
          for (let k of Object.getOwnPropertyNames(d.set)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({ id: k })
            }
          }
          globalObject["children"][i].children.push({
            children: childrenThird,
            id: p
          })
        }
      }
    }
	```
	
- 绘制 G6 Tree Graph
	- 需要在 HTML 中创建一个用于容纳 G6 绘制的图的容器，通常为 div  标签。G6 在绘制时会在该容器下追加 canvas 标签，然后将图绘制在其中。
		
		```javascript
		<div id="container" />
		```
	- 引入 G6 的数据源为 JSON 格式的对象。即上面我们处理过的 globalObject
	- 创建关系图（实例化）时，至少需要为图设置容器、宽和高。
		
		```javascript
		
	    const width = window.devicePixelRatio * window.screen.width * 0.5; // 高清显示
	    const height = window.devicePixelRatio * window.screen.height;
	    const graph = new G6.TreeGraph({
	      container: 'container',
	      width,
	      height,
	      modes: {
	        default: [
	          {
	            type: 'collapse-expand',
	            onChange: function onChange(item, collapsed) {
	              const data = item.get('model').data;
	              data.collapsed = collapsed;
	              return true;
	            },
	          },
	          'drag-canvas',
	          'zoom-canvas',
	        ],
	      },
	      defaultNode: {
	        size: 26,
	        anchorPoints: [
	          [0, 0.5],
	          [1, 0.5],
	        ],
	        style: {
	          fill: '#C6E5FF',
	          stroke: '#5B8FF9',
	        },
	      },
	      defaultEdge: {
	        type: 'cubic-horizontal',
	        style: {
	          stroke: '#A3B1BF',
	        },
	      },
	      layout: {
	        type: 'compactBox',
	        direction: 'LR',
	        getId: function getId(d) {
	          return d.id;
	        },
	        getHeight: function getHeight() {
	          return 16;
	        },
	        getWidth: function getWidth() {
	          return 16;
	        },
	        getVGap: function getVGap() {
	          return 10;
	        },
	        getHGap: function getHGap() {
	          return 100;
	        },
	      },
	    });
		```
		
	- 配置数据源，渲染
		
		```javascript
		graph.data(data);
	    graph.render();
	    graph.fitView();
		```
		
- 运行截图
	- ![g6](http://p0.meituan.net/myvideodistribute/348969f29ced9ddcebac4fce71a1de42543229.png)


## 写在后面
- [完整代码地址-戳我戳我戳我](https://github.com/Ele-Peng/antv-g6-realm)
- 祝大家多多发财