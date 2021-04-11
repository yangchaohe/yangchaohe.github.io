---
thumbnail:
title: 数据库SQL语法
date: 2021-3-15
tags:
categories: [数据库]
toc: true
recommend: 1
mathJax: false
---

> ..

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

## 其他

- `slug`列: 对用户和SEO友好
  - 避免使用中文
  - 避免使用 `for` 、`and`、`if` 、`or` 等 停用词（会被搜索引擎过滤）
  - 保证最终的 `url` 尽量简短，`slug` 的长度保持在 3-5 个单词之间
  - 在 `slug` 包含内容关键字，并选择正确的关键字
- `show index from table_name`: 显示添加的索引名
- `KEY`与`INDEX`同义, 都可以建立索引, 建议不要有相同的数据, 方便查询
  - KEY | INDEX: MUL
  - UNIQUE: UNI
  - PRIMARY KEY: PRI
- `truncate tablename`:会清空表的所有记录，并且使自增的id重置。
- `num = 'num+1'` 会报错 必须要`num=num+1`才行, 编程一定要小心

