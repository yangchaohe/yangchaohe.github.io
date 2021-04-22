---
title: Security
toc: true
recommend: 1
uniqueId: '2021-04-21 12:17:38/Security.html'
mathJax: false
date: 2021-04-21 20:17:38
thumbnail:
tags: [2021职业技能大赛-信息安全管理与评估,CS6200-28X-EI]
categories: [网络设备配置,神州]
keywords:
---
>   交换机端口安全可以分为基于MAC, 基于MAC+IP

<!-- more -->

## 绑定MAC

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

## 防ARP攻击

> ARP攻击会在局域网内大量的广播ARP报文, 消耗网络带宽
>
> ARP也能也能进行其他攻击, 比如[中间人攻击-ARP毒化](https://www.freebuf.com/articles/system/5157.html)
>
> 这些攻击极度的威胁着网络的安全

防止ARP攻击有两种方式

1. **基于端口**

   如果某个端口的ARP报文超过一定阈值, 则down该端口

2. **基于IP**

   记录某个IP的报文, 可以设置限速和隔离两个阈值, 超过阈值都会产生警告并处理

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

> 注意: CS6200-28X-EI SoftWare Package Version 7.5.3.2(R0004.0030)不支持一二级阈值
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

