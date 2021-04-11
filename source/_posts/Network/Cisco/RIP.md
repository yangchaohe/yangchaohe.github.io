---
title: 配置RIP
toc: true
recommend: 1
uniqueId: '2021-04-11 13:27:57/RIP.html'
mathJax: false
date: 2021-04-11 21:27:57
thumbnail:
tags: [RIP]
categories: [计算机网络,Cisco]
keywords: 
---
>  **路由信息协议**（英语：**R**outing **I**nformation **P**rotocol，缩写：**RIP**）是一种[内部网关协议](https://zh.wikipedia.org/wiki/内部网关协议)（IGP），为最早出现的[距离向量路由协议](https://zh.wikipedia.org/wiki/距離向量路由協定)。属于[网络层](https://zh.wikipedia.org/wiki/網絡層)，其主要应用于规模较小的、可靠性要求较低的网络，可以通过不断的交换信息让[路由器](https://zh.wikipedia.org/wiki/路由器)动态的适应网络连接的变化，这些信息包括每个路由器可以到达哪些网络，这些网络有多远等。
>
>  虽然RIP仍然经常的被使用，但是由于收敛慢和支持的广播网络规模有限等缺点，许多人认为它将会而且正在被诸如[OSPF](https://zh.wikipedia.org/wiki/OSPF)和[IS-IS](https://zh.wikipedia.org/wiki/IS-IS)这样的路由协议所取代。当然，我们也看到[EIGRP](https://zh.wikipedia.org/wiki/EIGRP)，一种和RIP属于同一基本协议类但更具适应性的路由协议，也有被使用。

<!-- more -->

## 简介

> **RIP**每隔30秒会与相邻的路由器交换子消息，以动态的创建[路由表](https://zh.wikipedia.org/wiki/路由表)。
>
> **RIPv1**使用[分类路由](https://zh.wikipedia.org/wiki/分类网络)，没有携带掩码信息, 不支持**CIDR**, 不支持验证

```shell
router rip # 配置RIP(v1)
no router rip # 禁用RIP
version 2 # 启用v2
show ip protocols # 显示ipv4路由协议(包括RIP)
```

## 通告网络

进入RIP配置模式后, 设置需要通告的网络

```shell
Router(config-router)#network network_ip	
```

> 如果使用RIPv1, network_ip会自动汇总为有类网络地址

## 禁用自动汇总

**启用RIPv2后**, 默认是启用自动汇总的, 在RIP配置模式下, 使用下面指令禁用

```shell
no auto-summary 
```

## 配置被动接口

> 默认情况下，将 RIP 更新从所有启用 RIP 的接口发出。但是，RIP 更新实际上仅需要从连接到其他启用 RIP 路由器的接口发出

在RIP配置模式下, 使用 **`passive-interface`** 路由器配置命令阻止通过路由器接口传输路由更新, 也就是将该接口配置成被动接口

> 所有路由协议都支持 **`passive-interface`** 命令。

## 传播默认路由

首先在边缘路由器上配置RIP, 然后

```shell
# config
ip route 0.0.0.0 0.0.0.0
# RIP配置模式下
default-information originate 
```

