---
title: Python正则
date: 2020-3-29
author: manu
toc: true
categories: Python
tag: 正则表达式
---

 python的正则

<!-- more -->

## 查找

### 贪婪

```python
import re

# 尽量满足6
re.findall("[a-z]{3,6}",list)
```

### 非贪婪

```python
import re

# 尽量满足3
re.findall("[a-z]{3,6}?",list)
```

`.`可以匹配除换行(\n)的任意字符

`I`标志可以忽略大小写

`S`标志可以匹配任意字符

```python
re.findall("^test",list,re.I | re.S)
# "|"不是或的意思，在这里表示与
```
## 查找并替换

```python
#用法一
re.sub("regular","substitute",string)
#用法二
def sub_fun(value):
    v = value.group()
    return "["+v+"]"
re.sub("regular",sub_fun,string)
```

## match,search

```python
# 查找字符开头开头
r = re.match("re",string)
# 在字符里查找到就返回
r2 = re.search("re",string)
# 上面返回的都是Match对象
# group返回查找到的值
print(r.group())
# span返回查找到的位置
print(r2.span())
```

## group

查找到的字符串是一个大组，给group()传递参数可以取得指定的组，不传递参数默认是0（即所有内容），可同时传递多个参数如group(1,2)，匹配第一个组和第二个组

```python
b = "<h1>Test</h1>"

r3 = re.search("<h1>(.*)</h1>",b)
print(r3.group(1))
# 或者
r3 = re.findall("<h1>(.*)</h1>",b)
print(r3)
```

groups()可直接得到里面的分组的数据而不需要传递参数，当然findall更方便