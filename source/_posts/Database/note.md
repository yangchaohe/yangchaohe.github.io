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

## 变量

mysql有全局变量（global），会话变量（local/session）和用户变量

### 全局变量

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

服务开启时可以动态的使用 `set` 更改一些可写变量

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

> 显示全局变量可以用 `show global variables like 'variable_name'`，也可以用 `select @@global.variable_name`

下面一张表记录了我常用的变量

| 变量                 | 功能     |
| -------------------- | -------- |
| @@version_compile_os | 系统版本 |
|                      |          |
|                      |          |

## 自带的数据库

### information_schema

这里面保存了 Mysql 服务器所有数据库的信息,如数据库名，数据库的表，表栏的数据类型与访问权限，包括变量等都是存在这里。

- `TABLES`：有两个字段 table_name 和 table_schema，分别记录 DBMS 中的存储的表名和表名所在的数据库

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/information-schema-tables.png)

- `COLUMNS`：提供了表中的列信息。详细表述了某张表的所有列以及每个列的信息。是show columns from schemaname.tablename的结果取之此表。
- `SCHEMATA`：提供了当前mysql实例中所有数据库的信息。是show databases的结果取之此表。
- `STATISTICS`：提供了关于表索引的信息。是show index from schemaname.tablename的结果取之此表。

## 常用函数

[参考MySQL8.0文档](https://dev.mysql.com/doc/refman/8.0/en/sql-function-reference.html)

| 函数                                                         | 功能                           |
| ------------------------------------------------------------ | ------------------------------ |
| version()                                                    | 查看当前数据库版本             |
| database()                                                   | 显示当前所处数据库             |
| user()                                                       | 当前用户                       |
| [`HEX()`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_hex) | 将输入的数字或字符串输出16进制 |
| [`LOAD_FILE()`](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_load-file) | 以字符的形式返回文件的内容     |
|                                                              |                                |
|                                                              |                                |

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

`into outfile`语句可以将选中的数据以 [特定格式](https://dev.mysql.com/doc/refman/8.0/en/select-into.html) 写入文件，

`into dumpfile`将数据以单行写入文件，通常用来输出二进制文件

> 参考文章
>
> [mysql自带的4个数据库](https://blog.csdn.net/chen_jl168/article/details/79123820)
>
> [MYSQL的用户变量和系统变量](https://zhuanlan.zhihu.com/p/33666600)