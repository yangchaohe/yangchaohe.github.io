---
thumbnail:
title: 数据库笔记
date: 2021-3-15
tags:
categories: [数据库]
toc: true
recommend: 1
mathJax: false
---

>  数据库踩坑记录

<!-- more -->

## 全局变量

使用 `show global variables` 可以显示全局变量。

**显示mysql安装目录**

```mysql
show global variables like '%basedir%'
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| basedir       | /usr/ |
+---------------+-------+
```

**显示mysql数据库所在目录**

```mysql
show global variables like '%datadir%'
+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| datadir       | /var/lib/mysql/ |
+---------------+-----------------+
```

服务开启时可以使用 `set` 更改这些变量

```sql
set global general_log_file="/var/log/mysql/general.log"
```

当服务重新启动时，这些变量也会变成默认值

也可以修改配置文件，当服务启动时会读取里面的变量

在archlinux系统里mariadb的默认配置文件在/etc/my.cnf和/etc/my.cnf.d/目录，我修改的是/etc/my.cnf.d/server.cnf的mysqld选项

```sql
[mysqld]
log_error=/var/log/mysql/error.log
# general会记录发送给服务器的所有SQL记录，默认关闭
general_log=ON
general_log_file='/var/log/mysql/general.log'
```

> 注意：如果文件不存在mysql不会记录，需要手动创建文件才行

## 杂项

`slug`列: 对用户和SEO友好
- 避免使用中文
- 避免使用 `for` 、`and`、`if` 、`or` 等 停用词（会被搜索引擎过滤）
- 保证最终的 `url` 尽量简短，`slug` 的长度保持在 3-5 个单词之间
- 在 `slug` 包含内容关键字，并选择正确的关键字

`show index from table_name`: 显示为该表添加的索引名

`KEY`与`INDEX`同义, 都可以建立索引, 建议不要有相同的数据, 方便查询
- KEY | INDEX: MUL
- UNIQUE: UNI
- PRIMARY KEY: PRI

`truncate tablename`:会清空表的所有记录，并且使自增的id重置。

`num = 'num+1'` 会报错 必须要`num=num+1`才行, 编程一定要小心

命令历史记录在用户主目录下.mysql_history里面

