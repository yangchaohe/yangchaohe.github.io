---
title: Vlan相关知识
toc: true
recommend: 1
keywords: 
uniqueId: '2021-04-09 12:13:08/Vlan相关知识.html'
mathJax: false
date: 2021-04-09 20:13:08
thumbnail:
tags:
categories: [计算机网络,Cisco]
---
>  本文收集了学习中的一些疑问而在网络上查询的一些文章

<!-- more -->

> [为什么需要VLAN](https://zhuanlan.zhihu.com/p/35616289)
>
> - 划分广播域
> - 静态, 动态VLAN
> - VLAN的端口类型(Access, trunk)
> - VLAN间路由
>
> [图解：快速计算冲突域和广播域数目](https://feichashao.com/broadcast_domain_calculation/)

## 本征VLAN

在trunk接口里, 如果接收到没有Vlan封装的数据包时, 会为其打上native vlan的tag.

主要作用就是为了兼容不支持vlan的设备

## 指令

> 开启trunk后, 默认会为vlan1转发流量

配置本征VLAN: `switchport trunk native vlan (vlan-id)`

- 不要指定vlan1

中继链路上允许的 VLAN 列表:`switchport trunk allowed vlan vlan-list`

- list写法: 1,2,3,4....

