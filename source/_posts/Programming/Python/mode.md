---
title: 使用模块简化代码
date: 2020-3-26 3:00
author: manu
toc: true
categories: [Python]
tag: 模块
---

 二次利用

<!-- more -->

## 引入模块

会导入所有方法

只能引入当前目录的模块

```python
# 引入所有方法
import moduleName
# 使用方法
moduleName.method1()
# 引入所有方法
from moduleName import  *
# 使用
method1()
```

### 别名

```python
import moduleName as new_name
```

## 引入模块的方法

```python
from module import method1,method2
```

### 别名

```python
from module import method1 as m1,method2
```

