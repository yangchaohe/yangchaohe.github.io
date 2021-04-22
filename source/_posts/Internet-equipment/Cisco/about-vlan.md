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
categories: [网络设备配置,Cisco]
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

## 端口绑定

> 动态模式下需要ping使用 `show mac-address-table` 才会显示MAC地址(ARP)

为了VLAN内的安全, 需要将交换机的**端口与主机MAC**或**主机MAC与IP**进行绑定

### 绑定MAC

```powershell
Switch(config)#interface f0/1
Switch(config-if)#switchport mode access #思科默认端口模式是dynamic(动态),端口绑定不能是动态
Switch(config-if)#switchport port-security #配置端口安全模式
Switch(config-if)#switchport port-security mac-address mac_address #绑定mac
```

- 绑定后非该MAC不能使用网络

### 绑定MAC与IP

- 使用MAC地址ACL表与ip地址ACL表组合

> 思科2950、3550、4500、6500系列交换机上可以实现，但是需要注意的是2950、3550需要交换机运行增强的软件镜像（Enhanced Image）

## cisco三层交换机

- `no switchport`启用路由端口
- `ip routing`启用路由功能
- 路由端口不支持子接口
- 路由端口不支持二层协议(并不是全部, STP)
- 创建SVI要保证VLAN在VLAN数据库内

## 指令

> 开启trunk后, 默认会为vlan1转发流量

创建VLAN: `vlan vlan_id`

**显示vlan基本信息**: `show vlan brief`

**配置本征VLAN**: `switchport trunk native vlan (vlan-id)`

- **不要指定vlan1**

**中继链路上允许的 VLAN 列表**:`switchport trunk allowed vlan vlan-list`

- list写法: 1,2,3,4....

**接口switchport信息**: `show interfaces (f/g) switchport`

**更改中继封装协议**: `switchport trunk encapsulation (dot1q/isl)`