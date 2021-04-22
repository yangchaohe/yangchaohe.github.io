---
title: 交换机基础配置
toc: true
recommend: 1
uniqueId: '2021-04-17 12:41:07/CS6200-28X-EI.html'
mathJax: false
date: 2021-04-17 20:41:07
thumbnail:
tags: [2021职业技能大赛-信息安全管理与评估,CS6200-28X-EI]
categories: [网络设备配置,神州]
keywords:
---
> 记录一些实用的用法, 我的环境是Version 7.5.3.2(R0004.0030)

<!-- more -->

## vlan

| 全局                                  | 作用                                         |
| ------------------------------------- | -------------------------------------------- |
| `show vlan`                           | vlan brief                                   |
| `interface ethernet <interface-list>` | 进入一个或多个VLAN, 不连续用 `;`, 连续用 `-` |

- 默认VLAN是可以互相通信的(自动启用路由功能)

## telnet

```powershell
# 配置用户
username <username> [privilege <privilege>] password (0 | 7) <password>
# 开启服务
telnet-server enable
# 启用ACL
authentication line vty login local
# 启用该IP作为安全IP
authentication securityip <ip-addr>
```

> `show users`可查看telnet和ssh登录的用户

## http

```powershell
ip http server
```

## ssh

```powershell
# 生成密钥
ssh-server host-key create rsa modulus <768-2048>
# 开启服务
ssh-server enable
```

> 神州交换机的ssh版本有点老, 自带的ssh客户端可能连不上, 需要加一些参数
>
> [ssh 登录旧设备的问题解决](https://www.zhihu.com/column/p/30840210)


## ACL

> 建议使用命名ACL

神州交换机的ACL设置语句语法与CISCO [ACL.md](../Networking/Cisco/ACL.md) 的基本一样, 使用有以下区别

```powershell
# 如果要启用ACL, 必须使用以下指令
Sw(config)#firewall enable 
# 可以将ACL应用于Telnet/ssh/web, test是我配置的命名ACL
Sw(config)#authentication ip access-class test in telnet 
# access-group可以显示一条access-list与特定端口的绑定关系
Sw(config)#show access-group interface ethernet 1/0/1
interface name:Ethernet1/0/1
    IP Ingress access-list used is test, traffic-statistics Disable.
Sw(config)#show access-lists 
ip access-list standard test(used 1 time(s)) 2 rule(s)
   rule ID 1: deny 192.168.1.0 0.0.0.255
   rule ID 3: deny 10.1.128.0 0.0.0.255
   
S3(config)#access-list ?
  <1-99>       IP 标准访问列表 <1-99>
  <100-199>    扩展访问列表规则 <100-199>
  <1100-1199>  MAC扩展访问列表规则 <1100-1199>
  <200-299>    扩展访问列表规则(支持非连续IP地址掩码) <200-299>
  <3100-3199>  MAC-IP扩展访问列表规则 <3100-3199>
  <3200-3299>  MAC-IP扩展访问列表规则(支持非连续IP地址掩码) <3200-3299>
  <5000-5099>  组播源控制访问列表规则 <5000-5099>
  <6000-7999>  组播目的控制访问列表规则 <6000-7999>
  <700-799>    MAC标准访问列表规则 <700-799>
```

##  SVI

> 没有cisco的`no switchport`指令, 将接口加入vlan就行了

目标: 让两台三层交换机下不同VLAN的PC互联

PC1:

```shell
sudo route add -net 192.168.20.0 netmask 255.255.255.0 gw 192.168.10.1
```

ip: 192.168.10.2

gw: 192.168.10.1

PC2:

ip: 192.168.20.2

gw: 192.168.20.1

S1:

vlan10: 192.168.10.1/24

vlan2: 192.168.2.1/24

S2:

vlan20: 192.168.20.1/24

vlan2: 192.168.2.2/24

```powershell
S1(config)#vlan 10
S1(config-vlan10)#vlan 2            
S1(config-vlan2)#switchport interface            
S1(config-vlan2)#switchport interface ethernet 1/0/3
S1(config-vlan2)#exit
S1(config)#interface vlan 2
S1(config-if-vlan2)#ip address 192.168.2.1 255.255.255.0
S1(config-if-vlan2)#exit                
S1(config)#interface vlan 10
S1(config-if-vlan10)#ip address 192.168.10.1 255.255.255.0
S1(config-if-vlan10)#exit
S1(config)#interface ethernet 1/0/1
S1(config-if-ethernet1/0/1)#switchport mode access 
S1(config-if-ethernet1/0/1)#switchport access vlan 10
S1(config)#ip route 192.168.20.0 255.255.255.0 192.168.2.2
```

```powershell
S2(config)#vlan 20
S2(config-vlan20)#exit
S2(config)#interface vlan 20
S2(config-if-vlan20)#ip address 192.168.20.1 255.255.255.0
S2(config-if-vlan20)#exit
S2(config)#vlan 2
S2(config-vlan2)#exit
S2(config)#interface vlan 2
S2(config-if-vlan2)#ip address 192.168.2.2 255.255.255.0
S2(config-if-vlan2)#exit
S2(config)#ip route 192.168.10.0 255.255.255.0 192.168.2.1
S2(config)#interface ethernet 1/0/3
S2(config-if-ethernet1/0/3)#switchport mode access           
S2(config-if-ethernet1/0/3)#switchport access vlan 2
```

## RIPv2

与思科 [RIP.md](../Networking/Cisco/RIP.md) 基本一致

`show ip route rip `显示RIP network的路由

`show ip protocol`查看RIP详情

## OSPFv2

> v2适用于IPv4, v3适用于IPv6

- 相同的域共享相同的LSDB

- 0代表主干域

> OSPF的区域以Backbone（骨干区域）作为核心，该区域标识为0域，所有的其他区域都必须与0域在逻辑上相连，0域必须保证连续。

```powershell
S1(config)#router ospf 
S1(config-router)#network 192.168.10.0/24 area 0
S1(config-router)#network 192.168.2.0/24 area 0 
S1(config-router)#show ip ospf route 
O  192.168.2.0/24 [1] is directly connected, Vlan2:192.168.2.1, Area 0.0.0.0  tag:0

O  192.168.10.0/24 [1] is directly connected, Vlan10:192.168.10.1, Area 0.0.0.0  tag:0

S2(config)#router ospf
S2(config-router)#network 192.168.2.0/24 area 0
Apr 16 20:00:56:000 2021 S1 DEFAULT/7/:[OSPF]Neighbor [Vlan2:192.168.2.1-192.168.20.1]: Status change Loading -> Fulls
S2(config-router)#network 192.168.20.0/24 area 0
S2(config-router)#show ip route
Codes: K - kernel, C - connected, S - static, R - RIP, B - BGP
       O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default

C       127.0.0.0/8 is directly connected, Loopback  tag:0
C       192.168.2.0/24 is directly connected, Vlan2  tag:0
O       192.168.10.0/24 [110/2] via 192.168.2.1, Vlan2, 00:00:30  tag:0
C       192.168.20.0/24 is directly connected, Vlan20  tag:0
Total routes are : 4 item(s)
```

## DHCP

```powershell
# 配置
S1(config)#ip dhcp pool <pool_name>
S1(dhcp-manu-config)#network-address 192.168.10.1 24
# gw
S1(dhcp-manu-config)#default-router 192.168.10.1
S1(dhcp-manu-config)#exit
# 启用
S1(config)#service dhcp

# 中继(设置其他DHCP服务器)
# config启用转发DHCP报文
ip forwark-protocol udp bootps
# 在接口设置转发地址
interface vlan_id
ip helper-address dhcp_server_ip
```

> 若设置多个pool时, 如不指定中继, 则会获得同一网段的pool的支持

## DHCP侦听

> 作用是屏蔽接入网络中的非法的DHCP服务器。即开启 DHCP Snooping 功能后，网络中的客户端只有从管理员指定的DHCP服务器获取IP地址。 由于DHCP报文缺少认证机制，如果网络中存在非法DHCP服务器，管理员将无法保证客户端从管理员指定的DHCP服务器获取合法地址，客户机有可能从非法DHCP服务器获得错误的IP地址等配置信息，导致客户端无法正常使用网络。

- 建议将连接[DHCP](https://zh.wikipedia.org/wiki/DHCP)服务器的端口设置为信任端口，其他端口设置为非信任端口。

```powershell
S1(config)#ip dhcp snooping enable 
# 记录非法信息
S1(config)#ip dhcp snooping blocked record enable
# 信任口
S1(config-if-ethernet1/0/1)#ip dhcp snooping trust
```

## 加密

```powershell
S2(config)#service password-encryption
show run
username test password 7 098f6bcd4621d373cade4e832627b4f6
```

## RIPng

> 运行在IPv6的RIP协议

```powershell
S1(config)#router ipv6 rip 
S1(config-router)#exit           
S1(config)#interface vlan 10

S1(config-if-vlan10)#ipv6 address 2021:4:17:10::1/64
# 在该接口运行RIPng，类似IPv4的network
S1(config-if-vlan10)#ipv6 router rip

S1(config-if-vlan10)#interface vlan 2
S1(config-if-vlan2)#ipv6 address 2021:4:17:2::1/64
S1(config-if-vlan2)#ipv6 router rip

```

## 端口隔离

> 利用端口隔离的特性，可以实现vlan内部的端口隔离
>
> 配置端口隔离功能后，一个**隔离组内的端口之间相互隔离**, 不同隔离组和不属于隔离组的端口可以互相访问
>
> 一台交换机上最多能够配置16个隔离组

| 全局模式下                                                   | 作用                   |
| ------------------------------------------------------------ | ---------------------- |
| `isolate-port group <WORD>`                                  | 创建隔离组             |
| `isolate-port group <WORD> switchport interface [ethernet | port-channel] <IFNAME>` | 将网口加入隔离组       |
| `show isolate-port group [ <WORD> ]`                         | 显示端口隔离的相关配置 |

## 端口环路检测

当交换机的端口接收到一个自己发送出去的报文时, 对其进行处理, 与STP有点类似

但与STP并不冲突, 端口环路检测针对一个端口, STP是全局

| 全局模式下                                                  | 作用                                               |
| ----------------------------------------------------------- | -------------------------------------------------- |
| `loopback-detection interval-time <loopback> <no-loopback>` | 设置环路检测的时间间隔                             |
| `oopback-detection control-recovery timeout <0-3600>`       | 配置环路检测受控方式是否自动恢复或者恢复的时间间隔 |

| 端口模式下                                      | 作用             |
| ----------------------------------------------- | ---------------- |
| `loopback-detection specified-vlan <vlan-list>` | 开启端口环路检测 |
| `loopback-detection control {shutdown | block}` | 检测到执行的功能 |

## 端口镜像

> **端口镜像功能**是指交换机把某一个端口接收或发送的数据帧完全相同的复制给另一个端口；其中被复制的端口称为镜像源端口，复制的端口称为镜像目的端口
>
> **流镜像功能**是指交换机把**端口的指定规则**的接收的数据帧完全复制给一个端口，其中指定规则只有为`permit`时流镜像才能生效

| 全局模式下                                                   | 作用     |
| ------------------------------------------------------------ | -------- |
| `monitor session <session> source {interface <interface-list>} {rx | tx | both}` | 指定源   |
| `monitor session <session> destination interface <interface-number>` | 指定目标 |
| `monitor session <session> source {interface <interface-list>} access-group <num> {rx|tx|both}` | 指定流   |

```powershell
S3(config)#monitor session 1 source interface ethernet1/0/1 ?
  access-list  访问列表
  both         管理发送和接收的流量
  rx           只管理接收的流量
  tx           只管理发送的流量
```

