---
title: 简单使用方法
date: 2020-3-26 2:00
author: manu
toc: true
categories: [Python]
tag: [方法,函数]
---

 就是函数

<!-- more -->

## 定义

```python
def funName(p1,p2):
	funBody
    return  
```

没有返回值时返回`None`

## 参数

**位置参数**

- 定义了方法的参数，然后使用方法按照位置填入参数

**关键字参数**

- 指定`参数名=值`

```python
print("hello","world",sep="-",end="")
```

**默认值**

在定义参数时可以指定默认值

设定默认值的参数必须放在后面

```python
def fun(a,b=2):
	funbody
```

**可变参数**

可变参数必须放在最后一个

输入的数据会被包装成**元组**

```python
def test(a,*n):
	# 可变的参数会被包装成元组，可以遍历它
	for i in n :
		print(i)
```

