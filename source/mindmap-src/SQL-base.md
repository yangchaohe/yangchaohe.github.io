# 数据库
## 基础语法
- 操作数据库
    - `CREATE DATABASE`
    - `SHOW DATABASES`
    - `SHOW CREATE DATABASE`
    - `ALTER DATABASE`
    - `DROP DATABASE`
- 操作表
    - `show tables`
    - `create table [select * from]`
    - `describe/desc`
    - `show create table`
    - `alter table [drop field]`
    - `drop table`
- 操作表数据
    - `insert into [select * from]`
    - `replace into [select * from] [set]`
    - `update table_name set [where]`
    - `delete from table [where]`
    - `truncate table_name`
- 
## MySQL
- 引擎
    - InnoDB
    - MyISAM
    - Memory
    - CSV
    - ..`SHOW ENGINES`
- 基本数据类型
    - TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT
    - FLOAT, DOUBLE, DECIMAL/DEC
    - YEAR, DATE, TIME, DATETIME, TIMESTAMP(前面都是str形式)
    - CHAR, VARCHAR, TEXT.., ENUM, SET, BINARY..
