---
title: Laravel笔记
toc: true
recommend: 1
uniqueId: '2021-08-03 16:18:44/Laravel.html'
mathJax: false
date: 2021-08-04 00:18:44
thumbnail:
tags:
categories:
keywords:
---

> 摘要

<!-- more -->

## Artisan Commands

| command                                          | action                  |
| :----------------------------------------------- | :---------------------- |
| `php artisan make:controller <ControllerName>`   | create new Controller   |
| `php artisan route:list`                         | show route list         |

## 在 LearnKu 学习 L01 所踩的坑

> 全程使用 Sail 虚拟环境学习, 注意 docker-compose.yml 和 .env 文件的变量

1. MySql 数据库报错1

```
SQLSTATE[HY000] [2002] Connection refused (SQL: select * from information_schema.tables where table_schema = laravel8 and table_name = migrations and table_type = 'BASE TABLE')
```

解决方法：将 `.env` 下的 `DB_HOST` 改为 `mysql`

2. 即使翻墙，Sail也会有概率构建失败，未找到原因

3. `compact()` 可以将一组变量转换为数组，键为变量名

4. 注意随时运行 `npm run watch-poll`

5. 使用 withInput() 后模板里 old('email') 将能获取到上一次用户提交的内容

6. `Str::str_plural()` 输出单词的复数
