---
title: Port_channel
toc: true
recommend: 1
uniqueId: '2021-04-19 16:06:26/Port_channel.html'
mathJax: false
date: 2021-04-20 00:06:26
thumbnail:
tags:
categories: [2021职业技能大赛-信息安全管理与评估]
keywords:
---
> Port Channel是一组物理端口的集合体，在逻辑上被当作一个物理端口。对用户来讲，完全可以将这个Port Channel当作一个端口使用，因此不仅能增加网络的带宽，还能提供链路的备份功能。
>
> 交换机提供了两种配置端口汇聚的方法：手工生成Port Channel、LACP（Link Aggregation Control Protocol）动态生成Port Channel。只有双工模式为全双工模式的端口才能进行端口汇聚。
>
> 一些命令不能在port-channel上的端口使用，包括：arp，bandwidth，ip，ip-forward等

<!-- more -->

## 同一组Port channel

为使Port Channel正常工作，本交换机Port Channel的成员端口必须具备以下相同的属性：

- 端口均为全双工模式
- 端口速率相同
- 端口同为Access端口并且属于同一个VLAN或同为Trunk端口或同为hybrid端口
- 如果端口同为Trunk端口或同为hybrid端口，则其Allowed VLAN和Native VLAN属性也应该相同

> 选举出Port Channel中端口号最小的端口作为Port Channel的主端口（Master Port）
>
> 若打开Spanning-tree功能，Spanning-tree视Port Channel为一个逻辑端口，由主端口发送BPDU帧
>
> 最大组数为128个，组内最多的端口数为8个

## LACP汇聚

### 端口状态

> 如果当前的成员端口数量超过了最大端口数的限制, 本端系统和对端系统会进行协商决定端口的状态

**selected**: 收发LACP报文, 转发用户数据

**standby**: 收发LACP报文, 不转发用户数据

优先比较以下值, 小的为selected:

系统优先级>系统MAC地址>端口优先级>端口号

> 在一个汇聚组中, 处于selected状态且端口号最小的端口为汇聚组的主端口, 其他处于selected状态的端口为汇聚组的成员端口

## 配置

```powershell
# config
# 创建port group
port-group <port-group-number>
# 设置LACP协议的系统优先级
lacp system-priority <system-priority>

# 端口模式
# 将该端口加入port group并设置模式, on表示静态
# active与passive相对 (一台交换机active, 一台passive)
port-group <port-group-number> mode {active | passive | on}
# 设置端口优先级
lacp port-priority <port-priority>

# 进入port-channel配置模式
interface port-channel <port-channel-number>
  bpdu-tunnel-protocol  Bpdu隧道
  description           设置别名
  dot1q-tunnel          Dot1q隧道
  end                   结束当前模式并转换到EXEC模式
  erps-ring             运行G.8032协议的以太网环
  ethernet              以太网
  exit                  结束当前模式并返回上一次模式
  fulleaps              升级的以太网自动保护倒换协议
  gvrp                  打开GVRP
  help                  交互系统描述
  igmp                  因特网组管理协议
  interface             选择要配置的接口
  ip                    IP协议配置命令
  ipv6                  IPv6信息
  language              设置语言
  mac-notification      MAC地址信息公告报文发送
  mrpp                  多环路自动保护协议
  no                    取消某命令或配置交换机缺省值
  pppoe                 添加链路标识功能 
  shutdown              关闭所选端口
  spanning-tree         生成树配置
  switchport            设置交换机端口特性
  ulpp                  上行链路保护功能 
  ulsm                  上行链路状态监控
  vlan                  VLAN命令
  vlan-tag              配置 vlan-tag状态
  vlan-translation      VLAN转换
```

> 动态与静态的区别
>
> 动态: 加入group时不会拆散原来的group