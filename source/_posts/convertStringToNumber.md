---
title: Javascript-convertStringToNumber
date: 2020-04-24 20:49:31
tags: 
- 前端概念 算法
categories:
- 前端概念 算法
description:
- 是的我要折腾一下 Javascript parseInt 内部实现，convertStringToNumber 了🙆


---

## 写在前面
- 简单记录一下，Javascript parseInt 内部实现，并实现 convertStringToNumber

## 实践准备
- 首先我们需要简单梳理一下我们的实现过程，再根据 [ECMAScript-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm) 标准完善实现
- input: @params: { str } 输入需要转换的字符串, { radix } 转换的指定基数
- 对 input 的简单处理 StringNumericLiteral
	- 规格化 str
	- ![StringNumericLiteral BNF](http://p0.meituan.net/myvideodistribute/6f4d129d30fe4d0b45743d72da9760ca14615.png)
		- 将 str 中可能出现的 StrWhiteSpace 去掉
			- ![StrWhiteSpace BNF](http://p0.meituan.net/myvideodistribute/3ab76a2ee0627ddeeec42e093ae8307717214.png)
				- ![LineTerminator BNF](http://p0.meituan.net/myvideodistribute/d9ba181d676994f053ba3ba067279cf48592.png)
	- 判断 radix 是否合法，仅支持 Decimal / BinaryInteger / OctalInteger / HexInteger radix
		- Decimal: 10
		- BinaryInteger: 2
		- OctalInteger: 8
		- HexInteger: 16
- 简单算法处理过程
	- 十进制数
		- ![StrDecimalLiteral BNF](http://p0.meituan.net/myvideodistribute/dbb89c490f4cbe92ce1e7b1025912cde51542.png)
		- 处理 Infinity 情况
		- 符号位处理
		- 小数点
		- 科学计数法
	- 二进制数
		- ![BinaryInteger](http://p1.meituan.net/myvideodistribute/f12e98da62b6529c1d3781a6c1dc36a86760.png)
	- 八进制数
		- ![OctalInteger](http://p1.meituan.net/myvideodistribute/e11bf633f8350bb17f761b719762ed038371.png)
	- 十六进制数
		- ![HexInteger](http://p0.meituan.net/myvideodistribute/274e704676b7d52093ac555c4b43f61013946.png)
- output: return number

## 详细实践
- 根据上面的实践准备

```javascript
/*
* @params: { str } 输入需要转换的字符串, { radix } 转换的指定基数
* return: number
*/
function convertStringToNumber(str, radix) {
  const noWhiteSpaceStr = replaceWhiteSpaceInStr(str) /** 将 str 中的 whitespace 进行匹配 */
  const checkedRadixStr = formatStrByRadix(str, radix) /** 将 str 根据指定基数进行转换 */
  let resNum = 0
  switch (radix) {
    case 10:
      resNum = converStringToDeciaml(str) /** 将 str 转成十进制 */
      break;
    case 2:
      resNum = converStringToBinaryInteger(str) /** 将 str 转成二进制*/
      break;
    case 8:
      resNum = converStringToOctalInteger(str) /** 将 str 转成八进制*/
      break;
    case 16:
      resNum = converStringToHexIntegers(str) /** 将 str 转成十六进制*/
      break;
    default:
      return NaN
  }
  return resNum
}
```
- 将 str 中的 whitespace 进行匹配
	
	```javascript
	/*
	* @params: { str } 输入需要替换的字符串
	* return: resStr 无 whitespace 字符串
	*/
	function replaceWhiteSpaceInStr(str) {
	  let resStr = str.replace(/\s*/g, '') // 去除空格
	  // resStr = resStr.replace(/^[\u000A|\u000D|\u2028|\u2029]/g, '') // 去除 LineTerminator unicode输入方式
	  resStr =  resStr.replace(/[\r|\n]/g, '') // 去除换行
	  return resStr
	}
	```
	- 单元测试
		- ![单元测试截图](http://p0.meituan.net/myvideodistribute/a70fa86dd4d8261537f8cbf5c0e5bc2c71147.png)
- 将 str 根据指定基数进行转换
	
	```javascript
	/*
	* @params: { str } 输入需要替换的字符串, { radix } 转换的指定基数
	* return: resStr 根据指定基数转换过得字符串
	*/
	function formatStrByRadix(str, radix) {
	  let resStr = ''
	  let testReg = null
	  switch (radix) {
	    case 10:
	      testReg = /^((0)|([1-9][0-9]*))?.?([0-9]*)((e|E)?(\+|\-)?([0-9]*))?/
	      break;
	    case 2:
	      // 根据 ECMA-262 是 /^0(b|B)(0|1)+$/
	      // 但是我在 Chrome 浏览器上测了，二进制没有 'b' or 'B'
	      testReg = /^(0|1)+/
	      break;
	    case 8:
	      // 根据 ECMA-262 是 /^0(O|o)[0-7]+$/
	      // 但是我在 Chrome 浏览器上测了，二进制没有 'o' or 'O'
	      testReg = /^[0-7]+/
	      break;
	    case 16:
	      // 根据 ECMA-262 是 /^0(x|X)([0-9a-fA-F])+/
	      // 但是我在 Chrome 浏览器自测中发现，没有表示符 'x' or 'X'也可
	      testReg = /^0(x|X)?([0-9a-fA-F])+/
	      break;
	    default:
	      console.log(`radix: ${radix}, str:  ${str} illegal radix`)
	      return false
	  }
	  resStr = (testReg.exec(str) && testReg.exec(str)['0']) || 'convert fail'
	  console.log(`radix: ${radix}, ${str} --> resStr: `, resStr)
	}
	formatStrByRadix('001010101', 3)
	formatStrByRadix('001010101', 2)
	formatStrByRadix('001010101', 8)
	formatStrByRadix('0b01010101', 2)
	formatStrByRadix('012345677', 8)
	formatStrByRadix('012345677', 2)
	formatStrByRadix('0o12345677', 8)
	formatStrByRadix('1.01E+23', 10)
	formatStrByRadix('.012345677', 10)
	formatStrByRadix('.012345677', 10)
	formatStrByRadix('0123acfACF', 16)
	formatStrByRadix('0x123acfACF', 16)
	formatStrByRadix('0x123acfACFG', 16)
	```
	- 单元测试
		- ![单元测试](http://p0.meituan.net/myvideodistribute/ff9d3e6a3cd279427f8873f91911290774369.png)

- 根据指定基数进行相应算法转换
	- 二进制：
		
		```javascript
		
		// 将 str 转成二进制
		function converStringToBinaryInteger(str, radix) {
		  return strMultipleRadix(str, radix)
		}
		
		/*
		* @params: { str } 输入需要替换的字符串, { radix } 转换的指定基数
		* return: resStr 乘以指定基数转换过得字符串
		*/
		function strMultipleRadix(str, radix) {
		  let tempStrArr = str.split('')
		  let res = 0
		  for (let i = tempStrArr.length - 1; i > 0; i --) {
		    res += tempStrArr[i] * Math.pow(radix, tempStrArr.length - i - 1)
		  }
		  return res
		}
		converStringToBinaryInteger('001010101', 2)
		```
		
		- 单元测试
			- ![单元测试截图](http://p0.meituan.net/myvideodistribute/5f3f3d1a2d0851eddaa1e258a182831864745.png)
	- 八进制
	- 十六进制



## 写在后面
- 祝大家多多发财
