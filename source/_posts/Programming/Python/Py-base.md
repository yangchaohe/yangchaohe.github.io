---
title: 基础
date: 2020-3-25
author: manu
toc: true
categories: Python
---

Python是一种跨平台的[计算机程序设计语言](https://baike.baidu.com/item/计算机程序设计语言/7073760)。 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。最初被设计用于编写自动化脚本(shell)，随着版本的不断更新和语言新功能的添加，越多被用于独立的、大型项目的开发。

<!-- more -->

适用范围

- Web 和 Internet开发
- 科学计算和统计
- 人工智能
- 桌面界面开发
- 软件开发
- 后端开发
- 网络爬虫

## 基础运算符

```python
n1 = 1 + 2
n2 = 1 - 3
n3 = 3 / 2
# 取整
n4 = 3 // 2
n5 = 3 * 8
# 乘方
n6 = 3 ** 4
```

## 字符串

```python
# 组拼
s1 = "hello" + str(23)
# 复制3份
s2 = "hello" * 3
```

## 输出

```python
print("hello")
# 不换行
print("world",end="")
```

## 输入

```python
# 等待输入，返回的是字符串
a = input()
# 转换类型
a = (int)a
```

## python之禅

在python终端输入`import this`会出现英文诗，是python的彩蛋，是一段编程思想，代表python的语言规范，给我印象最深的是那句“如果你无法向别人描述你的方案，那肯定不是一个好的方案，反之亦然”

> [关于python之禅](https://blog.csdn.net/gzlaiyonghao/article/details/2151918)

## **列表**

```python
list = []
list1 = [ 12,23,412,312,42 ]
# 访问整个列表
print(list1)
# 访问单个数据,索引从0开始
print(list1[1])
# 访问倒数第3个元素
print(list1[-3])
# 访问子列表,不包括结束索引
print(list1[0:3])
# print(list1[:2])默认从头部开始
# print(list1[2:])截取到尾部
# print(list1[:])==list1
list2 = [ "hello","world"]
# 添加数据
list2.append("test")
# 插入数据
list2.insert(0,"test2")
# 通过索引删除数据
del(list2[2])
del list2[2] 
# 通过值删除数据
list2.remove("hello")
# 获取索引
lis2.index("hello")
```

### pop

```python
list2.pop(2)
# 返回list[2]的值，并且删掉它
```

### 排序

```python
# sort，会修改原数据
# 字母a-z
# 数字1-9
# 可以使用传递reverse=True改变排序方式
list2.sort()
print(list2)
# 不改变源数据
newList = sorted(list1)
# 单纯翻转数据
list1.reverse()
```

### 长度

```python
# 获取列表长度
print(len(list1))
```

###  多维列表

指列表里面还是列表

```python
# 定义
l1 = [ [1,2,3,4],[5,6,7,8],[9,0] ]
# 使用
print(l1[0][2])
```

三维，四维都可以

### 遍历

- 直接遍历数据


```python
# for循环，注意冒号
for i in l1:
    # 缩进的表示循环体
    print(i)
# 没缩进的就是单独的语句
print("test")
```

​	python对缩进，空格有严格的要求

- 规律列表

```python
# 不包含结束
print(list(range(2,10)))
# 可以设置补长，默认1
print(list(range(2,10,2)))
```

- 通过遍历索引来遍历数据

```python
list1 = list(range(2,10,2))
# 代表2-10步进为2
for i in range(0,len(list1)):
    print(list1[i])
```

- 遍历加处理

```python
list2 = []
for i in range(0,10):
    list2.append(i**2)
print("list2:"+str(list2))
# 简写
list3 = [ i**2 for i in range(0,10)]
print("list3:"+str(list3))
```

### 简单处理数字

```python
min(list1)
max(list1)
sum(list1)
```

### 复制

```python
# 复制列表
list4 = list3[:]# server.py
# 从wsgiref模块导入:
from wsgiref.simple_server import make_server
# 导入我们自己编写的application函数:
from hello import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
httpd = make_server('', 8000, application)
print('Serving HTTP on port 8000...')
# 开始监听HTTP请求:
httpd.serve_forever()
# 复制引用(地址)
list5 = list3
```

### 合并

```python
# 列表的合并
list2.extend(list3)
list2 += list3
```

## 元组

不可修改的列表

```python
l = ( 1,2,3,4 )
# error
l.append(3)
```

## 条件分支

```python
n = 14
if n>10:
    print("执行语句1")
elif n<20:
    print("执行语句2")
else:
    print("执行语句3")
# 布尔值
a = 2
b = 3
res1 = a > b
res2 = a == b
print(res1)
print(res2)
# 多个条件
res = n >= 18 and n <= 40
res = n <=3 or n >= 50
# 判断是否在列表存在
l = [ 1,2,3,4 ]
res3 = 1 in l
res4 = 2 not in l
print(res3)
print(res4)
```

## 循环

```python
i = 0
while i<10:
    print(i)
    i += 1

# 中途退出循环
flag = True
while flag:
    print(i)
    i += 1
    if i == 20:
        flag = False
        # 或者break
```

