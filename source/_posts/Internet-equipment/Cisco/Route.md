---
title: 路由协议
toc: true
recommend: 1
uniqueId: '2021-04-15 02:53:41/Route.html'
mathJax: false
date: 2021-04-15 10:53:41
thumbnail:
tags:
categories: [网络设备配置,Cisco]
keywords:
---
> 摘要

<!-- more -->

## IGP 和 EGP 路由协议

- 自治系统 (AS) 是接受统一管理（比如公司或组织）的路由器集合。

- **内部网关协议 (IGP)** - 用于在 AS 中实现路由。它也称为 AS 内路由。IGP 包括 RIP、EIGRP、OSPF 和 IS-IS。
- **外部网关协议 (EGP)** - 用于在 AS 间实现路由。它也称为 AS 间路由。边界网关协议 (BGP) 是目前唯一可行的 EGP，也是互联网使用的官方路由协议。

## 距离矢量路由协议

距离矢量意味着通过提供两个特征通告路由：

- **距离** - 根据度量（如跳数、开销、带宽、延迟等）确定与目的网络的距离。

- **矢量** - 指定下一跳路由器或送出接口的方向以达到目的地。

有四个距离矢量 IPv4 IGP：

- **RIPv1** - 第一代传统协议

- **RIPv2** - 简单距离矢量路由协议

- **IGRP** - 第一代思科专有协议（已过时并由 EIGRP 取代）

- **EIGRP** - 距离矢量路由高级版 

## 链路状态路由协议

> 与距离矢量路由协议的运行过程不同，配置了链路状态路由协议的路由器可以获取所有其他路由器的信息来创建网络的完整视图（即拓扑结构）。

有两个链路状态 IPv4 IGP：

- **OSPF** - 常用的基于标准的路由协议

- **IS-IS** - 常见于提供商网络

## 有类路由协议

> 有类路由协议和无类路由协议之间的最大区别是有类路由协议不会在路由更新中发送子网掩码信息。而无类路由协议在路由更新中包含子网掩码信息。
>
> 所开发的两个原始 IPv4 路由协议是 RIPv1 和 IGRP

## 无类路由协议

> 现代网络不再使用有类 IP 编址，因此子网掩码不能由第一个二进制八位数的值来确定。无类 IPv4 路由协议（RIPv2、EIGRP、OSPF 和 IS-IS）在路由更新中都包括网络地址的子网掩码信息。无类路由协议支持 VLSM 和 CIDR。
>
> IPv6 路由协议是无类的。有类或无类的区别仅适用于 IPv4 路由协议。

## 路由协议特征

**收敛速度** - 收敛速度是指网络拓扑结构中的路由器共享路由信息并使各台路由器掌握的网络情况达到一致所需的时间

**可扩展性** - 可扩展性表示根据一个网络所部署的路由协议，该网络能达到的规模

**有类还是无类（使用 VLSM）** - 有类路由协议不包含子网掩码，也不支持 VLS

**资源使用率** - 资源使用率包括路由协议的要求，如：内存空间 (RAM)、CPU 利用率和链路带宽利用率

**实现和维护** - 实现和维护体现了对于所部署的路由协议，网络管理员实现和维护网络时必须要具备的知识级别。

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/route-protocol.png)

## 路由协议度量

- **路由信息协议 (RIP)** - 跳数

- **开放最短路径优先 (OSPF)** - 根据源到目的地的累积带宽计算出的思科成本

- **增强型内部网关路由协议 (EIGRP)** – 最小带宽、延迟、负载和可靠性。