---
title: ACL
toc: true
recommend: 1
uniqueId: '2021-04-13 04:26:55/ACL.html'
mathJax: false
date: 2021-04-13 12:26:55
thumbnail:
tags: 
categories: [计算机网络,Cisco]
keywords:
---
> ACL(访问控制列表) 是一系列被称为访问控制条目 (ACE) 的 permit 或 deny 语句组成的顺序列表。ACE 通常也称为 ACL 语句
>
> ACE有严格的顺序要求
>
> ACL可以用于普通接口, 也可以用于vty

<!-- more -->

## 标准ACL

- 基于**源IP地址**过滤数据包

- 标准访问控制列表的访问控制列表号是**1~99**

### 创建ACL

```powershell
# config
Router(config):access-list access-list-number {permit | deny} source [source-wildcard]
# wildcard(通配符) 采用子网掩码反码形式
```

### 使用ACL

```powershell
# 接口模式下
ip access-group list_id in/out
# 在vty模式下
access-class list_id in/out
```

### 查看ACL

```powershell
# 创建的
show access-lists
# 启用的
show running-config 
```

>  由于标准 ACL 不会指定目标地址，所以其位置应该尽可能靠近目标。在流量源附近设置标准 ACL 可以有效阻止流量通过应用了 ACL 的接口到达任何其他网络

## 扩展ACL

- 基于**源IP地址、目的IP地址、指定协议、端口**来过滤数据包
- 扩展访问控制列表的访问控制列表号是**100~199**

### 创建

```powershell
access-list 100-199
{permit|deny|remark} protocol_type
[host] source_ip [wildcard] {lt|gt|eq..} {server_name|port}
[host] destnation_ip [wildcard] {lt|gt|eq..} {server_name|port}
[dscp|established|precedence]
```

> 将扩展 ACL 放置在尽可能靠近需要过滤的流量源的位置上。这样，不需要的流量会在靠近源网络的位置遭到拒绝，而无需通过网络基础设施
>
> 放置原则可以简单理解为:  
>
> - 扩展匹配细致, 所以放在源
> - 标准匹配广泛, 所以放在目标

## 命名ACL

> 命名访问控制列表允许在标准和扩展访问控制列表中使用名称代替表
>
> 优点就是可以单独的增删语句, 且自定义顺序

### 创建

```powershell
# 创建一个命名ACL表
ip access-list {standard|extended} {name|1-99|100-199}
# 在表内写语句, 序号默认10,20...
[1-2147483647] {permit|deny}....
```

- 不需要哪条语句时进命名ACL表no掉就好

