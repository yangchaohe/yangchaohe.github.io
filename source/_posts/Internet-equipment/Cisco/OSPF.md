---
title: OSPF简述
toc: true
recommend: 1
uniqueId: '2021-04-15 03:29:17/OSPF.html'
mathJax: false
date: 2021-04-15 11:29:17
thumbnail:
tags:
categories: [网络设备配置,Cisco]
keywords:
---
> 摘要

<!-- more -->

## 功能

- **无类** - OSPFv2 设计为无类方式；因此，它可支持 IPv4 VLSM 和 CIDR。

- **高效** - 路由变化会触发路由更新（非定期更新）。它使用 SPF 算法选择最优路径。

- **快速收敛** - 它能迅速地传播网络变化。

- **可扩展** - 在小型和大型网络中都能够良好运行。路由器可以分为多个区域，以支持分层结构。

- **安全** - OSPFv2 支持消息摘要 5 (MD5) 和安全散列算法 (SHA) 身份验证。OSPFv3 使用互联网协议安全性 (IPsec) 添加 OSPFv3 数据包的身份验证。启用身份验证时，OSPF 路由器只接受来自对等设备中具有相同预共享密钥的加密路由更新。

> OSPF的AD为110

## 组件

### **数据结构**

OSPF 创建和维护三种数据库：

- **邻接数据库** - 创建邻居表

- **链路状态数据库 (LSDB)** - 创建拓扑表

- **转发数据库** - 创建路由表

![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static//img/article/2021/OSPF.png)

这些表包含用于交换路由信息的邻接路由器列表，在 RAM 中保存和维护。

### **路由协议消息**

第 3 层设备（例如路由器）运行 OSPF 交换消息，使用 5 种类型的数据包传输路由信息。

1. Hello 数据包

2. 数据库描述数据包

3. 链路状态请求数据包

4. 链路状态更新数据包

5. 链路状态确认数据包

### **算法**

路由器使用根据 Dijkstra SPF 算法得出的计算结果创建拓扑表。

SPF 算法基于到达目的地的累计开销。 