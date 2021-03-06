---
title: 装饰器
date: 2020-4-4
author: manu
toc: true
categories: [Python]
tag: 装饰器
---

当需求变更，在给函数添加新功能时，遵循"对修改是封闭的，对扩展是开放的"，也就是说不去修改函数而是扩展函数

<!-- more -->

举个简单的栗子

```python
def f1():
    print("this is f1")
def f2():
    print("this is f2")
f1()
f2()
```

需要给上面的函数新增一个打印当前时间的功能，为了不破坏原有的函数，可以这样做

```python
import time

def f1():
    print("this is f1")
def f2():
    print("this is f2")
# f1()
# f2()
def current_time(func):
    print(time.time())
    func()
current_time(f1)
current_time(f2)
```

这种做法不怎么”优雅”，它改变了原有的结构，改变了调用方式，解决的办法就是装饰器

### 定义装饰器

本质就是函数或类，python是可以将函数作为参数进行传递和返回的

```python
def decorator(func):
    def wrapper():
        print(time.time())
        func()
    return wrapper
```

那怎么使用呢？如果采用下面的方式

```python
t = decorator(f1)
t()
```

这样其实还是破坏了原有结构，接下来使用语法糖

### 语法糖

`@`就是装饰器的语法糖，之所以叫语法糖是因为看着舒服，写着舒服，就像吃了糖一样（与其对应的还有语法盐）

它的作用就是可以省略赋值操作

```python
import time

def decorator(func):
    def wrapper():
        print(time.time())
        func()
    return wrapper
@decorator
def f1():
    print("this is f1")
@decorator
def f2():
    print("this is f2")
f1()
f2()
```

定义了装饰器，使用了语法糖，而原函数和调用都没有改变

### 参数

上面都是没有参数的函数，当函数有一个甚至多个参数时装饰器又该怎么改变呢

```python
import time

def decorator(func):
    def wrapper(p1):
        print(time.time())
        func(p1)
    return wrapper
@decorator
def f1(p1):
    print("this is "+p1)
@decorator
def f2(p1,p2):
    print("this is "+p1+p2)
f1(p1)
```

如果在装饰器内指定参数个数的话，那么它就不具有通用性了，这没有任何意义，需要使用可变参数

```python
import time

def decorator(func):
    def wrapper(*args):
        print(time.time())
        func(*args)
    return wrapper
@decorator
def f1(p1):
    print("this is "+p1)
@decorator
def f2(p1,p2):
    print("this is "+p1+p2)
f1('p1')
f2('p1','p2')
```

当某函数有关键字参数呢

```python
import time

def decorator(func):
    def wrapper(*args,**kw):
        print(time.time())
        func(*args,**kw)
    return wrapper
@decorator
def f3(**kw):
    print(kw)
f3(name='manu',age=19)
```

这时装饰器就算完整了，适用所有函数