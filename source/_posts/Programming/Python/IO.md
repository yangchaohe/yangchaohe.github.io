---
title: 文件IO
date: 2020-3-28 12:00
author: manu
toc: true
categories: [Python]
tag: IO流
---

 操作文件

<!-- more -->

## 读取

```python
import os
# 打印当前目录
print(os.getcwd())
# 改变工作目录
os.chdir("/home/manu")
print(os.getcwd())
# 创建目录
os.makedirs("test1/test2")
# 读取文件
with open("blog/_config.yml") as file:
    content = file.read()
    print(content)
# 读取行
with open("blog/_config.yml") as file:
    for line in file:
        print(line.rstrip())
# 放在列表里面
with open("blog/_config.yml") as file:
    l = file.readlines()
```

## 写入

```python
import os 
# 覆盖
with open("pytext.txt","w") as file:
    file.write("hello,world!")
# 追加
with open("pytext.txt","a") as file:
    file.write("hello,world!")
```

