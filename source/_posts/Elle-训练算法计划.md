---
title: Elle-训练算法计划
date: 2020-04-06 18:37:00
tags: 
- 算法
categories:
- 算法
description:
- 简单记录一下自己整个算法训练的基础步骤+学习方法


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
- 简单记录一下自己整个算法训练的基础步骤+学习方法
- 主要的数据结构和算法会单开文档来写

<!-- more -->
## Chunk it up 切碎知识点
- 数据结构
	- 一维数据结构
		- 基础：数组 array(string), 链表 linked list
		- 高级：栈 stack, 队列 queue, 双端队列 deque, 集合 set, 映射 map (hash or map), etc
	- 二维数据结构
		- 一维泛化
		- 基础：树 tree，图 graph
		- 高级：二叉搜索树 binary search tree (red-black tree, AVL)，堆 heap, 并查集 disjoint set, 字典树 trie, etc
	- 特殊数据结构
		-  位运算 bitwise, 布隆过滤器 bloom filter
		-  LRU Cache
- 算法
	- if-else, switch --> branch
	- for, while loop --> iteration
	- 递归 recursion (divide & conquer 分治, backtrace 回溯)
	- 搜索 search: 深度优先搜索 depth first search, 广度优先搜索 breadth first search, A* (启发式搜索), etc
	- 动态规划 dynamic programing
	- 二分查找 binary search
	- 贪心 greedy
	- 数学 math, 集合 geometry

## Deliberate Practicing 刻意练习
- 刻意练习-过遍数 (五遍刷题法)
	- 刷题第一遍
		- 5分钟（5~15 mins）：读题+思考
		- 直接看解法：注意！多解法，比较解乏优劣
		- 有思路，直接写
		- 背诵+默写好的解法
	- 刷题第二遍
		- 马上自己写 --> LeetCode提交
		- 多种解法比较、体会 --> 优化
		- 多种解法自己写一遍，直到通过
	- 刷题第三遍
		- 24h后，再重复做题
		- 不同解法的熟练程度 --> 专项练习
	- 刷题第四遍
		- 过了一周后：反复回来练习相同的题目
		- 不熟练的题目 --> 专项练习
	- 刷题第五遍
		- 面试前二周恢复性训练
- 练习缺陷、弱点地方
	- 中文站 leetcode-cn.com 刷题
	- 国际站 leetcode.com 看discuss-most votes
- 切题
	- **Clarification 审题**
	- **Possible Solutions**
		- compare (time/space)
		- optimal (加强)
	- **Coding**
	- **Test cases**

## Feedback 反馈
- 即时反馈
- 主动型反馈
- 被动型反馈
	- code review

## 指法
- top tips for vscode

## 自顶向下的编程方式
- [自顶向下的编程方式](http://markhneedham.com/blog/2008/09/15/clean-code-book-review/)

## Big O Notation
- O(1): constant Complexity 常数复杂度
- O(log n): Logarithmic Complexity 对数复杂度
- O(n): Linear Complexity 线性时间复杂度
- O(n^2): N square Complexity 平方
- O(n^3): N cube Complexity 立方
- O(2^n): Exponential Growth 指数
- O(n!): Factorial 阶乘
- ![时间复杂度](http://p0.meituan.net/myvideodistribute/c88294c6a8b88448ae14e2914c7bbfd2337181.png)

## master theorem
- 二分查找
- 二叉树的遍历（每个节点都访问一次，且仅访问一次）
- 二维有序矩阵
- 归并排序 O(nlogn)
- ![主定理](http://p1.meituan.net/myvideodistribute/5b978d58635ea2e9233ea5e502ab706f246540.png)