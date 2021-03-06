---
title: 函数编程
date: 2020-4-2
author: manu
toc: true
categories: Python
tag: 闭包
---

 高阶函数编程

<!-- more -->

## 闭包

定义：在内部函数中，对外部的变量进行引用，外部函数返回内部函数。简单来说，闭包=环境+函数块

例子

```python
def p():
    x = 0
    def go(step):
        nonlocal x
        new_pos = x + step
        x = new_pos
        return x
    return go
t = p()
print(t(4))
print(t(5)) 
```

## 匿名函数

也叫lambda表达式，强调表达式

```python
lambda parameter_list: expression
```

## 三元表达式

```python
a if a > b else b
```

## map

```python
# 会将list的数据都传入 fun函数 接收
map(fun,list)
```

- fun可以用lambda
- 参数可以有多个
- 返回的列表个数取决于参数列表个数的最小值
- 返回的是一个对象

## reduce

```python
from functools import reduce

l = [1,2,3,4,5,6,7,8]

t = reduce(lambda x,y: x+y,l )
print(t)
```

- 他会对lambda进行连续调用
- 上面的运行过程是：先从`l`取出1,2相加，结果传入x，再从`l`取出3传入y..
- 还可以指定一个初始值传入x

## filter

```python
l2 = ['a','b','C','A','Z']
f = filter(lambda x: ord(x)>=65 and ord(x)<91,l2)
print(list(f))
```

- 将列表的数据传入函数，结果为真保留数据
- 结果只要能判断真假就行，不一定需要布尔值