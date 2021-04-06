---
title: Linux服务器架设总结 
date: 2020-9-11 00:00
author: shepherd
toc: ture
categories: [Linux]
tags: [服务器]  
---

学好如何搭建服务器及后期维护, 本文参考CentOS进行学习

<!-- more -->

## 1.搭建服务器之前的准备

- 使用LVM管理磁盘方便后期弹性变化分区

## 2.网络的基本概念

- 端口和网络服务对应在`/etc/services`
- DNS服务器IP在`/etc/resolv.conf`
- 主机地址全为0是Network, 全为1是Broadcast(通过IP/Netmask计算得出)
- 将数据发往非同一网络内的主机需要`Gateway`
- ARP table负责记录MAC与对应IP
- LoopBack网段在`127.0.0.0/8`
- 每个主机都有路由表, 使用命令`route`可以查询, 其中最重要的就是默认网关
- ICMP负责汇报网络情况
- 只有root才能使用小于1024的端口
- 以太网传输数据的技术是CSMA/CD

- MTU标准定义为1500Bytes, 可以更改MTU的值, 但需要考虑整个网络. 在支持Jumbo frame的设备上一般将MTU设置成9000Bytes.

## 3.局域网架构简介

- 在linux上购买网卡需要注意驱动
- Cat 5网线可以尝试自行压制, 由于蕊线裸露, 影响到电子屏蔽效应, 超过Cat 5等级的网线建议购买现成
- 购买无线网卡AP时, 考虑安全因素(监听), 需要网卡能`限制MAC上网`
- 上网速度并不全与网络带宽有关, 还要考虑自身配置以及传输接口的能力

## 4.连接到Internet

- NIC(网卡)需要内核的支持, 如果内核不支持则需要重新编译内核与网卡的内核模块(需要厂商开放源码), 或者换一张Linux支持的NIC
- `dmesg`会显示`kernel ring buffer`的内容, 引导系统会将硬件及驱动信息写到这个缓冲区内
- `lspci`可以查询设备芯片数据
- `lsmod`可以显示已加载的模块
- `lsusb`显示usb设备
- `modinfo`可以显示模块信息
- `modprobe`用于加载模块
- 可以在`/etc/modprobe.d/`下配置模块与设备的联系, 一般在内核捕捉不到网卡时使用

| 修改的参数 | 配置文件和启动脚本                        |
| ---------- | ----------------------------------------- |
| IP相关     | /etc/sysconfig/network-scripts/ifcfg-eth0 |
|            | /etc/init.d/network restart               |
| DNS        | /etc/resolv.conf                          |
| hosts      | /etc/sysconfig/network                    |
|            | /etc/hosts                                |

-  修改主机名后查看是否能ping通, 否则某些服务会启动得很慢(在查找hosts)
-  DHCP会主动修改网络配置文件
-  查询主机名和IP顺序: `/etc/hosts-->/etc/resolv.conf`
-  ping得到IP但网址无法进入, 大概率域名解析错误
-  网关不能重复设置, 比如网卡的配置文件与拨号上网的配置文件重复设置网关

## 5.Linux常用的网络命令

- 通过`ifconfig`可以查询、配置网卡和IP网络等参数, 重启后消失
- 由于`ifdown` 会分析当前网络参数是否与配置文件相同, 所以使用`ifconfig`修改参数后不能使用`ifdown`
- 一个`网络接口`就是一个路由, 数据包会根据路由表顺序发送数据(`route`)
- `ping`&`traceroute` 是可以使用ICMP协议的网络程序 
- `telnet`传递明文数据, 非常危险
- `ping`可以向网络中强制发送不可拆解的大数据包来侦测MTU大小
- `nc`有的系统称为`netcat`

## 6.网络的安全与主机基本防护

### 常见攻击手段

- 弱密码
- 利用程序漏洞
- 社会工程学
- 被动攻击(浏览恶意网站)
- 蠕虫和木马ROOKIT(会伪装)

> 在CentOS里可以使用`rpm -Va`查询被修改的文件
>
> 此外可以使用`RKHunter`来检测后门

- DDOS(如SYN泛洪)

### 防护手段

- 使用强密码(大小写字母、数字和符号的组合. 密码越长越强)
- 设定用户密码规则
- 关闭不必要的网络服务, 并随时保持最新(软件)
- 不要在网络上透露帐号密码等信息
- 不要连接不明主机
- 完善防火墙
- 监控日志

