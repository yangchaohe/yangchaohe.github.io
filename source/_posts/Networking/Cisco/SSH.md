---
title: SSH
toc: true
recommend: 1
uniqueId: '2021-04-11 16:16:32/SSH.html'
mathJax: false
date: 2021-04-12 00:16:32
thumbnail:
tags:
categories: [计算机网络,Cisco]
keywords:
---
> 安全外壳 (SSH) 是一种提供远程设备的安全（加密）管理连接的协议

<!-- more -->

## 配置

1. 使用 `show ssh` 查看当前系统是否支持SSH
2. 使用 `ip domain-name (dname)`设置域名
3. 生成RSA秘钥对

```shell
# config
ip ssh version 2
crypto key generate rsa # 长度
crypto key zeroize rsa # 删除RSA, ssh会自动禁用
```

4. 配置用户+密码

```shell
username username secret password
```

5. 配置vty线路

```shell
# config
line vty 0-15 # 配置所有线路
transport input ssh # 使用ssh
login local # 使用本地数据库(提供用户名+密码)
```

## 连接

```shell
ssh [-p port] username@host
```

