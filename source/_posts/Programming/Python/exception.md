---
title: 异常处理
date: 2020-3-28 18:00
author: manu
toc: true
categories: [Python]
tag: 异常处理
---

 把这个单独写是不是太水了

<!-- more -->

```python
try:
    i = 9/0
# 捕捉异常
except ZeroDivisionError:
    print("0不能做分母")
# 没出现异常执行的代码（可不写）
else:
    print("没有异常")
print("end")
```

