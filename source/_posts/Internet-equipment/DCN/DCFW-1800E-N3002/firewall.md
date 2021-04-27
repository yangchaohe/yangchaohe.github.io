---
title: 防火墙基础概念及配置
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
>   介绍了基础的系统架构, 全局使用UI进行配置
>
>   webUI基于Version 5.0和5.5

<!-- more -->

## 接口

接口允许流量进出安全域。因此,为使流量能够流入和流出某个安全域,必须将接口绑定到该
安全域,并且,如果是三层安全域,还需要为接口配置 IP 地址。然后,必须配置相应的策略规则,
允许流量在不同安全域中的接口之间传输。多个接口可以被绑定到一个安全域,但是一个接口不能
被绑定到多个安全域。系统支持多种类型接口,实现不同功能。

> **虚拟接口也算一个接口**

## 安全域(ZONE)

安全域将网络划分为不同部分,例如 trust(通常为内网等可信任部分)、untrust(通常为因
特网等存在安全威胁的不可信任部分)等。将配置的策略规则应用到安全域上后,安全网关就能够
对出入安全域的流量进行管理和控制。系统提供 8 个预定义安全域, 分别是: trust、 untrust、 dmz、L2-trust、L2-untrust、L2-dmz、VPNHub 和 HA。

一个安全域只能绑定一个VS或VR

> **为接口设置安全域**

## VSwitch(Virtual Switch)

VSwitch 工作在二层, 将二层安全域绑定到 VSwitch 上后, 绑定到安全域的接口也被绑定到该 VSwitch 上。系统有一个默认的VSwitch, 名为 VSwitch1, 默认情况下, 二层安全域都会被绑定到 VSwtich1 中。

> **为安全域设置VSwitch**

## VR(Virtual Route)

VRouter 具有路由器功能,不同 VR 拥有各自独立的路由表。系统中有一个默认 VR, 名为 trust-vr, 默认情况下, 所有三层安全域都将会自动绑定到 trust-vr 上

## 策略

策略实现安全网关保证网络安全的功能。通过策略规则决定从一个安全域到另一个安全域的哪些流量该被允许,哪些流量该被拒绝。

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

### webUI界面

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/dcfw-host.png)

5.0路径: 系统管理>设备管理

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

5.0路径: 系统管理>设备管理