---
title: Security
toc: true
recommend: 1
uniqueId: '2021-04-21 12:17:38/Security.html'
mathJax: false
date: 2021-04-21 20:17:38
thumbnail:
tags: [CS6200]
categories: [2021职业技能大赛-信息安全管理与评估]
keywords:
---
>  mac绑定

<!-- more -->

## 交换机MAC与IP绑定

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

## 交换机绑定MAC

> 可以防止MAC泛洪

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