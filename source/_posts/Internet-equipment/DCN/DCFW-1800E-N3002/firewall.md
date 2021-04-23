---
title: 防火墙基础配置
toc: true
recommend: 1
uniqueId: '2021-04-17 12:40:53/DCFW-1800.html'
mathJax: false
date: 2021-04-17 20:40:53
thumbnail:
tags: [技能大赛-信息安全,DCFW-1800E-N3002]
categories: [网络设备配置,神州]
keywords:
---
>  使用UI进行配置

<!-- more -->

## webUI配置

> 安全网关的 ethernet0/0 接口配有默认 IP 地址 192.168.1.1/24,并且该接口的各种管理功
> 能均为开启状态
>
> 使用 `https://192.168.1.1`
>
> 默认用户: admin
>
> 密码: admin

## 连接安全

```powershell
DCFW-1800# configure 
# 允许来自0.0.0.0/0的登录类型, 0.0.0.0代表任意主机
DCFW-1800(config)# admin host 0.0.0.0/0 <any|http|https|ssh|telnet>
```

webUI界面

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/dcfw-host.png)

## 接口服务

```
DCFW-1800(config)# interface ethernet0/0
DCFW-1800(config-if-eth0/0)# man
DCFW-1800(config-if-eth0/0)# manage ?
  ip                Interface Internet Protocol config commands
  ssh               Enable service SSH
  telnet            Enable service telnet
  ping              Enable service ping
  snmp              Enable service SNMP
  http              Enable service Web
  https             Enable service SSL
  ftp               Enable service ftp
  traceroute        Enable service udp-tcp traceroute
```

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/dcfw.png)

## 管理员

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/dcfw-user.png)