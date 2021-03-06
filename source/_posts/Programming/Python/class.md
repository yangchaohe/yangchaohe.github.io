---
title: 类
date: 2020-3-28
author: manu
toc: true
categories: [Python]
---

 类的定义与继承

<!-- more -->

##   定义

```python
class Animal():
    # 构造方法
    def __init__(self,name,age):
        self.name = name
        self.age  = age
    # self必须写，代表自身
    def sleep(self):
        print(self.name+"在睡觉")
```

## 继承

因为python是多继承，所以使用super()需要参数表示哪个使用哪个父类

- 第一个参数代表当前类
- 第二个参数self代表实例
- 意思就是根据实例去找类的父类，不同的实例就会有不同的父类
- 使用super只会调用第一个父类
- 在python3中支持super()的写法

```python
class Cat(Animal):
    # 调用父类的构造方法
    def __init__(self,name,age):
        super(Cat,self).__init__(name,age)
    def catch(self):
        print(self.name+"在抓老鼠")
        
cat1 = Cat("xiaobai",1)
cat1.catch()
```

## 方法重写和实例属性

```python
class Animal():
    def __init__(self,name,age):
        self.name = name
        self.age  = age
    def sleep(self):
        print(self.name+"在睡觉")

class Cat(Animal):
    def __init__(self,name,age,hair_color):
        super().__init__(name,age)
        # 实例类作为猫的属性，方便管理
        self.hair_color = Body(hair_color)

    def catch(self):
        print(self.name+"在抓老鼠")
    # 重写
    def sleep(self):
        print(self.name+"趴着睡觉")

class Body():
    def __init__(self,hair_color):
        self.hair_color = hair_color

cat1 = Cat("xiaobai",1,"white")
cat1.catch()
```

