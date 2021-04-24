---
title: DCP-debugging
toc: true
recommend: 1
uniqueId: '2021-04-24 03:50:17/DCP-debugging.html'
mathJax: false
date: 2021-04-24 11:50:17
thumbnail:
tags: [技能大赛-信息安全,CS6200-28X-EI]
categories: [网络设备配置,神州]
keywords:
---
> DCP(*Dynamic CPU Protection*动态CPU防护)又称为动态CPU限速，当检测到具有某种特定源IP的报文上CPU的速率超过一定的速率值时，将对该类报文进行限速处理。

<!-- more -->

| 全局配置模式                | 作用               |
| --------------------------- | ------------------ |
| `dcp enable`                | 开启DCP            |
| `dcp limit-rate <20-50>`    | 设置限速(对所用IP) |
| `dcp no-limit-ip <ip_addr>` | 设置不限速的IP     |


