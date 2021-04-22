---
title: DHCP
toc: true
recommend: 1
uniqueId: '2021-04-13 10:44:56/DHCP.html'
mathJax: false
date: 2021-04-13 18:44:56
thumbnail:
tags: [DHCP]
categories: [网络设备配置,Cisco]
keywords:
---
> 分配IP的方式有两种: 
>
> 一是静态手动分配
>
> 二是动态DHCP分配

<!-- more -->

原理已经计算机自顶向下中得知, 不在多说, 直接开始配置

```powershell
# 排除 IPv4 地址
ip dhcp excluded-address low_address [height_address]
# 配置地址池
ip dhcp pool pool_name
# 进入配置地址池后,
# 定义地址池(必选)
network network_ip [mask|/prefix-length]
# 定义默认路由(必选)
default-route address #可以有多个
# [定义DNS服务器]
dns-server address #可以有多个
# [定义域名]
domain-name domain
# [租约]
lease {days [hours] [minites] | infinite}
# 禁用dhcp, 在config模式下
no service dhcp
```

