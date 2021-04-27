---
title: ALTER
toc: true
recommend: 1
uniqueId: '2021-04-25 15:49:04/ALTER.html'
mathJax: false
date: 2021-04-25 23:49:04
thumbnail:
tags:
categories: [数据库]
keywords:
---
>  常用**ALTER**语法

<!-- more -->

## 修改

### 添加外键约束

```sql
ALTER TABLE 表名
ADD CONSTRAINT 外键名
FOREIGN KEY (该表需要被关联的外键列名)
REFRENCES 外表名 (列名)
```

### 删除外键约束

```sql
ALTER TABLE 表名
DROP FOREIGN KEY 外键名
```

> 利用外键约束可以完成1对1, 多对多, 1对多关系

### 添加索引

索引可以为表添加查询效率, 所以列数据最好唯一

```sql
ALTER TABLE 表名
ADD INDEX 索引名(列名,可多列)
```