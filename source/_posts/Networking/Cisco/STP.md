---
thumbnail:
title: STP及变体
date: 2021-4-14 00:00
tags: [STP]
categories: [计算机网络,Cisco]
toc: true
recommend: 1
keywords: 
uniqueId: network/cisco/STP.html
mathJax: false
---

>  当在交换网络中提供物理冗余时, 为了防止二层交换网络形成环路, 造成广播风暴等严重后果, 于是有了生成树等协议
>
> 对于生成树更好的理解, 我推荐[这篇文章](https://www.zhihu.com/answer/109458339)

<!-- more -->

# STP

## 端口角色

### BPDU

是所有参与STP交换机的交流信息帧, 里面就有BID

### BID

包含 **优先级值(16个值, 默认32768, 步进4096)**, **源MAC**, **扩展系统ID(STP是VLAN_id)**.

> `show spanning-tree active`时, 优先级=优先级值+VLAN_id
>
> 优先级可手动指定
>
> `spanning-tree vlan vlan_id priority`

### ROOT Bridge

BID最小的为根网桥

> 相同优先级, MAC最小的是根网桥

### 根端口

根端口靠近根网桥, 非根网桥只能有一个根端口

### 指定端口

允许转发流量, 在某个网段里开销最小的端口为指定端口

### 非指定端口

不允许转发流量, 在某个网段里开销最大的端口为非指定端口

> RSTP(快速STP), 定义了代替端口 备用端口 禁用端口

### 根路径开销

STA默认通过网速确认开销, 也可通过 `spanning-tree vlan vlan_id cost cost_value`手动修改(思科交换机默认的协议是 `pvst+` )

开销值决定了哪个接口处于转发(小的就转发)

## 根网桥

- 每个生成树实例（交换 LAN 或广播域）都有一台交换机指定为根网桥

- 为生成树实例选择根网桥后，STA 便开始确定从广播域内所有目的地到根网桥的最佳路径

# PVST+

## 端口状态

**阻塞** - 该端口是替代端口，不参与帧转发。

**侦听** - 侦听到根网桥的路径

**学习** - 学习 MAC 地址

**转发** - 该端口是活动拓扑的一部分

**禁用** － 该第 2 层端口不参与生成树，不会转发帧。

> 使用 **show spanning-tree summary** 命令可以显示各种状态（阻塞、侦听、学习或转发）下的端口数量。

## 负载均衡

与上面的STP不同, PVST+允许每个VLAN有一个STP实例

也就是说, 交换机上的一个中继端口可以阻止某个 VLAN, 同时转发其他 VLAN

### 指令

```powershell
spanning-tree vlan vlan_id root {primary|secondary}
# vlan_id可以有两种写法[1,2,3..|1-99]
```

### portfast

将交换机的某个端口直接设置为转发状态

```powershell
# 进入某接口
spanning-tree portfast 
# 全局配置模式设置非TRUNK接口为portfast
spanning-tree portfast default 
```

### BPDUGUARD

```powershell
# 进入某接口
spanning-tree bpdduguard enable
# 全局配置模式设置非TRUNK接口为portfast
spanning-tree portfast bpduguard default
```



# 快速PVST+

> 快速PVST+可以将RSTP应用到每个VLAN
>
> RSTP相对与STP有更快的收敛速度
>
> PSTP定义了新的端口状态, 如果端口被配置为替代端口或备用端口, 则该端口可以立即转换到转发状态, 而无需等待网络收敛

## 边缘端口

- RSTP 边缘端口概念对应 PVST+ PortFast 功能
- RSTP 边缘端口应立即转换到转发状态，从而跳过原始 802.1D 中耗时的侦听和学习端口状态
- `spanning-tree portfast` 命令来执行边缘端口配置

> 建议不要将边缘端口配置为连接其他交换机

## 链路类型

- **点对点** - 在全双工模式下运行的端口通常将交换机连接到交换机，并且是快速转换到转发状态的候选端口。

- **共享** - 在半双工模式下运行的端口将交换机连接到连接各种设备的集线器。

一般都是自动确定, 也可手动选择

```powershell
spanning-tree link-type { point-to-point | shared }
```

## 负载均衡

同样支持负载均衡, 与PVST+语法相同