---
title: NAT简述及其配置
toc: true
recommend: 1
uniqueId: '2021-04-25 03:25:11/NAT.html'
mathJax: false
date: 2021-04-25 11:25:11
thumbnail:
tags: [技能大赛-信息安全,DCFW-1800E-N3002]
categories: [网络设备配置,神州]
---
> 网络地址转换(*Network Address Translation*)简称为 NAT,是将 IP 数据包包头中的 IP地址转换为另一个 IP 地址的协议。当 IP 数据包通过路由器或者安全网关时,路由器或者安全网关会把 IP 数据包的源 IP 地址和/或者目的 IP 地址进行转换。

<!-- more -->

## 简述

NAT可以修改IP地址和TCP端口, 因为IP分为来源IP和目标IP, 所有NAT又分为SNAT和DNAT

SNAT: 最常见的方式, 可以让LAN内的主机连接到internet

DNAT: 修改目标IP可以让公网IP访问到LAN的服务器(DMZ)

## 配置

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/Screenshot_20210425_201053.png)

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/DNAT.png)

注意: 配置NAT时可以先配置地址簿(存储IP地址条目)和服务簿(协议,端口条目)