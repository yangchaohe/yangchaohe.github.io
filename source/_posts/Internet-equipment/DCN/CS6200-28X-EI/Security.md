---
title: Security
toc: true
recommend: 1
uniqueId: '2021-04-21 12:17:38/Security.html'
mathJax: false
date: 2021-04-21 20:17:38
thumbnail:
tags: [技能大赛-信息安全,CS6200-28X-EI]
categories: [网络设备配置,神州]
keywords:
---
>   交换机端口安全和ARP, ACL, URPF等配置

<!-- more -->

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

## 端口绑定MAC

> 绑定后如果连接的不是绑定的MAC, 或者数量超出限制, 都会触发交换机的保护机制
>
> 可以有效的防止MAC泛洪

```powershell
Sw(config)#interface ethernet 1/0/1
Sw(config-if-ethernet1/0/1)#switchport port-security
# 静态绑定
Sw(config-if-ethernet1/0/1)#switchport port-security 00:90:9e:9a:a0:60
# 可设置MAC数量
switchport port-security max <cnt>
# 动态学习
Sw(config)#mac-address-learning cpu-control 
Sw(config)#show port-security address      

Secure Mac Address Table                          
-------------------------------------------------------------------------------------  
Vlan                Mac Address                             Type                Ports               
1                   00-90-9e-9a-a0-60                       SECURED             Ethernet1/0/1       
Total Addresses:1
```

| 端口模式下                                                   | 作用                                  |
| ------------------------------------------------------------ | ------------------------------------- |
| `switchport port-security violation {protect|recovery|restrict|shutdown}` | 当MAC不正确或超过规定数量时执行的操作 |
| `clear port-security {all|configured|dynamic}[[address <mac-addr>| interface <interface-id>] [vlan<vlan-id> ]]` | 清除绑定                              |

## MAC与IP绑定

```powershell
Sw(config)#am enable               
Sw(config)#interface ethernet 1/0/1 
Sw(config-if-ethernet1/0/1)#am port 
Sw(config-if-ethernet1/0/1)#am mac-ip-pool 00:90:9e:9a:a0:60 10.1.128.24
Sw(config)# show am interface ethernet 1/0/1
AM is enabled
Interface Ethernet1/0/1
    am port
    am mac-ip-pool  00-90-9e-9a-a0-60 10.1.128.24
```

## URPF[三层]

> 通常情况下，网络中的路由器接收到报文后，获取报文的目的地址，针对目的地址查找路由，如果查找到则进行正常的转发，否则丢弃该报文。由此得知，路由器转发报文时，并不关心数据包的源地址，这就给源地址欺骗攻击有了可乘之机。
>
> 源地址欺骗攻击就是入侵者通过构造一系列带有伪造源地址的报文，频繁访问目的地址所在设备或者主机，即使受害主机或网络的回应报文不能返回到入侵者，也会对被攻击对象造成一定程度的破坏。
>
> **URPF(*Unicast Reverse Path Forwarding*)**通过检查数据包中源IP地址，并根据接收到数据包的接口和路由表中是否存在源地址路由信息条目，来确定流量是否真实有效，并选择数据包是转发或丢弃。

| 全局配置模式                      | 作用                |
| --------------------------------- | ------------------- |
| `urpf enable`                     | 全局启动URPF        |
| 端口配置模式                      | 作用                |
| `ip urpf enable {loose | strict}` | 端口启动和关闭 URPF |

- **strict:** 不但要求路由器转发表中，存在去往报文源地址的路由；而且还要求报文的入接口与转发表中去往源地址路由的出接口一致
- **loose:** 仅要求路由器的转发表中，存在去往报文的源地址路由即可

## ARP

| 全局          | 作用               |
| ------------- | ------------------ |
| `arp timeout` | arp表项老化时间(s) |

| vlan接口下                                                   | 作用        |
| ------------------------------------------------------------ | ----------- |
| `arp <ip_address> <mac_address> {interface [ethernet] <portName> }` | 指定静态arp |

> 静态arp只能在vlan下且参数必须有物理接口才能添加成功

## 防ARP扫描攻击

> ARP攻击会在局域网内大量的广播ARP报文, 消耗网络带宽
>
> ARP也能也能进行其他攻击, 比如[中间人攻击-ARP毒化](https://www.freebuf.com/articles/system/5157.html)
>
> 这些攻击极度的威胁着网络的安全

防止ARP扫描攻击有两种方式

1. **基于端口**

   如果某个端口的ARP报文超过一定阈值, 则down该端口

2. **基于IP**

   记录某个IP的报文, 可以设置限速和隔离两个阈值, 超过隔离阈值则禁止来自此IP的任何流量

*两者可同时存在*

### 基于端口和基于IP的配置

1. 开启ARP扫描功能

```powershell
anti-arpscan enable [ip|port]
```

2. 设置基于端口阈值(包/s)

```powershell
anti-arpscan port-based threshold <threshold-value>
```

3.  基于IP的阈值配置, 二级阈值必须>一级阈值

```powershell
anti-arpscan ip-based level1|level2 threshold <threshold-value>
```

> 注意: CS6200-28X-EI SoftWare Package Version 7.5.3.2(R0004.0030)不支持一二级阈值, 超过设置阈值则禁止来自此IP的任何流量
>

### 其他配置

| 全局                                             | 作用             |
| ------------------------------------------------ | ---------------- |
| `anti-arpscan trust ip <ip-address> [<netmask>]` | 配置信任IP       |
| `anti-arpscan recovery enable`                   | 启用自动恢复功能 |
| `anti-arpscan recovery time <seconds>`           | 恢复秒数         |
| `anti-arpscan log enable`                        | 打开日志         |

配置信任端口

```powershell
# 端口模式下
anti-arpscan trust <port | supertrust-port| iptrust-port >
```

## ARP绑定

> 在IPv4里, 为了防止ARP中间人攻击, ARP绑定也是一种防御手段
>
> IPv6使用的是ND协议, 这是一个类ARP的协议, ND绑定命令同ARP

ARP绑定有两种方法

### 关闭交换机ARP更新

即交换机的MAC-PORT表存在后就不允许再改变

指令[全局配置]: `ip arp-security updateprotect`

### 关闭自动学习功能

只能设置静态ARP, 如果先前有动态也可以手动转化为静态

指令[全局配置]: `ip arp-security learnprotect`

动态转为静态[全局配置]: `ip arp-security convert`

## ARP guard

> 对于ARP中间人攻击, arp guard则采用了保护ip的方法, 如果arp报文的源IP与保护IP一致则丢弃该报文, 通常用来保护网关, 不应该用来保护大量的IP地址, 会影响性能

指令[全局]: `arp-guard ip <addr>`

