---
title: 交换机认证配置
toc: true
recommend: 1
uniqueId: '2021-04-21 01:38:57/Authentication.html'
mathJax: false
date: 2021-04-21 09:38:57
thumbnail:
tags: [CS6200]
categories:　[2021职业技能大赛-信息安全管理与评估]
keywords:
---
>  关于802.1x, radius, aaa等

<!-- more -->

## 802.1X

> 802.1X是IEEE LAN/WAN 委员会为了解决**基于端口的网络接入控制**（*Port-Based Network Access Control*）而定义的一个标准，该标准目前已经在无线局域网和以太网中被广泛应用。

### 概述

802.1X验证涉及到三个部分

- 申请者: 客户端设备
- 验证者: 网络设备, 如交换机或者无线接入点
- 验证服务器: 支持[RADIUS](https://zh.wikipedia.org/wiki/RADIUS)和[EAP(Extensible Authentication Protocol)](https://zh.wikipedia.org/wiki/EAP)的主机

申请者向验证者提供凭据，如用户名/密码或者数字证书，验证者将凭据转发给验证服务器来进行验证．

如果验证服务器认为凭据有效，则申请者（客户端设备）就被允许访问被保护侧网络的资源

> 在验证者PAE(端口访问实体)与RADIUS服务器之间，可以使用两种**认证方式**来交换信息。一种是EAP协议报文使用EAPOR（EAP over RADIUS）封装格式承载于RADIUS协议中；另一种是EAP协议报文由接入控制单元PAE进行终结，采用包含PAP（Password Authentication Protocol，密码验证协议）或CHAP（Challenge Handshake Authentication Protocol，质询握手验证协议）属性的报文与RADIUS服务器进行认证交互

### 认证方式

> 认证过程可以由客户端主动发起，也可以由设备端发起。一方面当设备端探测到有未经过认证的用户使用网络时，就会主动向客户端发送EAP-Request/Identity 报文，发起认证；另一方面客户端可以通过客户端软件向设备端发送EAPOL-Start 报文，发起认证。

802.1x系统支持*EAP 中继方式*和*EAP 终结方式*与远端RADIUS 服务器交互完成认证

EAP终结方式与EAP中继方式的认证流程相比，不同之处在于用来对用户密码信息进行加密处理的随机加密字由设备端生成，之后接入控制单元会把用户名、随机加密字和客户端加密后的密码信息一起送给RADIUS 服务器，进行相关的认证处理

下面是对中继和终结方式扩展出的三种优化认证模式

**基于端口**

**基于MAC**

**基于用户(IP+mac+端口, 可防止ARP欺骗)**

> 交换机最大认证用户数：user-based用户数为ipv4支持700，ipv6支持1400；mac-based和交换机的限速值相关，最大可以达到4000人，推荐使用认证用户数不超过2000人

### 常用配置

| 全局配置模式                    | 作用                   |
| ------------------------------- | ---------------------- |
| `dot1x enable`                  | 打开全局dot1X          |
| `dot1x user free-resource <ip>` | 未认证能访问的有限资源 |

| 端口模式                                                     | 作用                     |
| ------------------------------------------------------------ | ------------------------ |
| `dot1x guest-vlan <vlanID>`                                  | 设置guest vlan           |
| `dot1x port-method {macbased|portbased|userbased [standard|advanced]}` | 设置端口的认证方式       |
| `dot1x port-control {auto|force-authorized|force-unauthorized =}` | 设置端口的802.1x授权状态 |

### 配置RADIUS服务器

```powershell
# 配置认证服务器
Switch(config)#radius-server authentication host 10.1.1.3
# 配置计费服务器
Switch(config)#radius-server accounting host 10.1.1.3
# Configure authentication and encryption key
Switch(config)#radius-server key <0|7> key
Switch(config)#aaa enable
Switch(config)#aaa-accounting enable 
```

## AAA与radius

> AAA(*Authentication,Authorization and Accounting*认证、授权和计费), 它提供了网络安全管理的一致性框架,该框架通过认证、授权和计费三大功能满足了安全网络的访问控制需求: 哪些用户可以访问网络设备,访问用户拥有哪些访问权限以及用户使用网络资源的统计计费。

RADIUS(*Remote Authentication Dial-In User Service*,远程认证拨号用户服务)是一种分布式的、客户端/服务器结构的信息交互协议。RADIUS客户端一般在网络设备上启用,与802.1x协议结合实现认证、授权和计费的所有主要功能,而RADIUS服务器负责维护用户认证、授权和计费信息数据库,通过RADIUS协议与客户端进行通信,完成用户认证和授权信息的下发以及计费信息的统计。RADIUS协议是实现AAA框架的一种协议。

