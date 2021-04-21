---
title: 小知识
toc: true
recommend: 1
uniqueId: '2021-04-13 03:21:30/skills_competition.html'
mathJax: false
date: 2021-04-13 11:21:30
thumbnail:
tags:
categories: [2021职业技能大赛-信息安全管理与评估]
keywords:
---
> VLSM CIDR picocom 

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
- `ip routing`启用路由功能
- 路由端口不支持子接口
- 路由端口不支持二层协议(并不是全部, STP)
- 创建SVI要保证VLAN在VLAN数据库内


