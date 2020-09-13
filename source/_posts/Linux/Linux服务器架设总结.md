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
- 将数据发往非同一网络内的主机需要Gateway
- ARP table负责记录MAC与对应IP
- LoopBack网段在127.0.0.0/8
- 每个主机都有路由表, 使用命令`route`可以查询, 其中最重要的就是默认网关
- ICMP负责汇报网络情况
- 只有root才能使用小于1024的端口
- 以太网传输数据的技术是CSMA/CD

- MTU标准定义为1500Bytes, 可以更改MTU的值, 但需要考虑整个网络, 在支持Jumbo frame的设备上一般将MTU设置成9000Bytes.

## 3.局域网架构简介

- 在linux上购买网卡需要注意驱动
- Cat 5网线可以尝试自行压制, 由于蕊线裸露, 影响到电子屏蔽效应, 超过Cat 5等级的网线建议购买现成
- 购买无线网卡AP时, 考虑安全因素(监听), 需要网卡能`限制MAC上网`
- 上网速度并不全与网络带宽有关, 还要考虑自身配置以及传输接口的能力

## 4.连接到Internet

-  NIC(网卡)需要内核的支持, 如果内核不支持则需要重新编译内核与网卡的内核模块(需要厂商开放源码), 或者换一张Linux支持的NIC
- `dmesg`会显示`kernel ring buffer`的内容, 引导系统会将硬件及驱动信息写到这个缓冲区内
- `lspci`可以查询设备芯片数据
- `lsmod`可以显示已加载的模块
- `modinfo`可以显示模块信息
- `modprobe`用于加载模块
- 可以在`/etc/modprobe.d/`下配置模块与设备的联系, 一般在内核捕捉不到网卡时使用