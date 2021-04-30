---
title: udf提权
toc: true
recommend: 1
uniqueId: '2021-04-30 16:05:09/udf.html'
mathJax: false
date: 2021-05-01 00:05:09
thumbnail:
tags: [MySQL,数据库]
categories: [个人技术心得,渗透]
keywords:
---
>  UDF 即 User Defined Funtion，通过udf提权可以用来把数据库root用户权限转化为数据库管理员（mysql）的权限，在windows里面可能就获取到了系统管理员的权限

<!-- more -->

国光大佬的文章写的很棒，贴个链接方便以后自己复习哈哈，这里记录自己踩的坑

1. MANJARO的mariadb动态链接库在/usr/lib/mysql/plugin/下，用户是root，连数据库管理员都不能写入
2. 刚开始以为是将mysql的权限提为root，后来想想，linux的root这么好提？实践后才发现原来是有了mysql的权限，我太自作多情

> 参考文章
>
> [MySQL 漏洞利用与提权](https://www.sqlsec.com/2020/11/mysql.html#toc-heading-10)