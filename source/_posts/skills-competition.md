---
title: 2021职业技能大赛-信息安全管理与评估
toc: true
recommend: 1
uniqueId: '2021-04-13 03:21:30/skills_competition.html'
mathJax: false
date: 2021-04-13 11:21:30
thumbnail:
tags:
categories: 
keywords:
---
> 摘要

<!-- more -->

## VLSM&CIDR

如果说vlsm是将子网掩码细分, 那CIDR就是将子网掩码汇总

用来规划网络

## 串口工具

`sudo pacman -S picocom`

### 使用

`sudo picocom -b 波特率 device`

`ctrl-a` 进入转义模式

`ctrl-h` 帮助

## cisco三层交换机

- `no switchport`启用路由端口
- 路由端口不支持子接口
- 路由端口不支持二层协议(并不是全部)
- 创建SVI要保证VLAN在VLAN数据库内

## 神州交换机配置

### telnet

```powershell
# 配置用户
username <username> [privilege <privilege>] password (0 | 7) <password>
# 开启服务
telnet-server enable
# 启用ACL
authentication line vty login local
```

### http

```powershell
ip http server
```

### ssh

```powershell
# 生成密钥
ssh-server host-key create rsa modulus <768-2048>
# 开启服务
ssh-server enable
```

> 神州交换机的ssh版本有点老, 自带的ssh客户端可能连不上, 需要加一些参数
>
> [ssh 登录旧设备的问题解决](https://www.zhihu.com/column/p/30840210)























































































































































































