---
title: dynamic-vlan
toc: true
recommend: 1
uniqueId: '2021-04-22 02:05:56/dynamic-vlan.html'
mathJax: false
date: 2021-04-22 10:05:56
thumbnail:
tags:
categories: [2021职业技能大赛-信息安全管理与评估]
keywords:
---
>  动态VLAN可以根据用户的MAC, IP, 网络层协议进行划分
>
> 静态VLAN是基于端口进行划分

<!-- more -->

> <span style='color: red;'>注意</span>: 动态 VLAN 需要跟端口的 Hybrid 属性配合才能很好的工作
>
> hybrid&trunk区别: 
>
> Hybrid 端口可以允许多个 VLAN 的报文发送时不打标签,而 Trunk 端口只允许 native VLAN 的报文发送时不打标签

## 基于MAC

1. 打开端口的基于MAC功能, hybrid

```powershell
SwitchA(Config-Ethernet1/0/1)#switchport mac-vlan enable
SwitchA(Config-Ethernet1/0/1)#swportport mode hybrid
SwitchA(Config-Ethernet1/0/1)#swportport hybrid allowed vlan vlan_id <untag|tag>
```

2. 指定VLAN为基于MAC模式

```powershell
mac-vlan vlan <vlan-id>
```

3. 指定vlan与MAC的对应关系

```powershell
mac-vlan mac <mac-addrss> <mac-mask> vlan <vlan-id> priority <priority-id>
```

- mac-mask建议为`ff:ff:ff:ff:ff:ff`

## 基于IP

1. 打开端口的基于IP功能, hybrid

```powershell
SwitchA(Config-Ethernet1/0/1)#switchport subnet-vlan enable
SwitchA(Config-Ethernet1/0/1)#swportport mode hybrid
SwitchA(Config-Ethernet1/0/1)#swportport hybrid allowed vlan vlan_id <untag|tag>
```

> 动态的vlan一定要在端口模式下进行`hybrid allowed`

2. 设置IP子网与 VLAN 的对应关系

```powershell
subnet-vlan ip-address <ipv4-addrss> mask <subnet-mask> vlan <vlan-id> priority <priority-id>
```

## 调整优先级

```powershell
dynamic-vlan mac-vlan prefer
dynamic-vlan subnet-vlan prefer
```

