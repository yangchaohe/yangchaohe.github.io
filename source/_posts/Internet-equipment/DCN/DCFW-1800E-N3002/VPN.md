---
title: VPN简述及实现
toc: true
recommend: 1
uniqueId: '2021-04-25 03:17:02/VPN.html'
mathJax: false
date: 2021-04-25 11:17:02
thumbnail:
tags: [技能大赛-信息安全,DCFW-1800E-N3002,IPsec,SSL,L2TP]
categories: [网络设备配置,神州]
keywords:
---
> VPN(*Virtual Private Network*虚拟专用网络)
>
> vpn通常拿来做2个事情，一个是可以让世界上任意2台机器进入一个虚拟的局域网中（当然这个局域网的数据通讯是加密的，很安全，用起来和一个家庭局域网没有区别），一个是可以用来翻墙

<!-- more -->

神州数码系统支持 VPN 功能,包括 IPSec VPN、基于 SSL 的远程登录解决方案——Secure Connect VPN(简称为 SCVPN) 、拨号 VPN、PnPVPN 和 L2TP VPN。用户可以配置 VPN隧道,并且根据不同需求选择以下两种 VPN 隧道的应用方式:
♦ 基于策略的 VPN: 将配置成功的 VPN 隧道名称引用到策略规则中,使符合条件的流量通过指定的 VPN 隧道进行传输。
♦ 基于路由的 VPN: 将配置成功的 VPN 隧道与隧道接口绑定;配置静态路由时,将隧道接口指定为下一跳路由。符合条件的流量将会经过 VPN 隧道进行传输。

## Secure Connect VPN



> 参考
>
> [vpn工作原理和搭建方法](https://yuerblog.cc/2017/01/03/how-vpn-works-and-how-to-setup-pptp/)
>
> [VPN原理与简单应用](https://zhuanlan.zhihu.com/p/71536075)
>
>  [IPSec-VPN基本原理](https://cshihong.github.io/2019/04/03/IPSec-VPN%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86/)
>
> [IPSec-VPN之IKE协议详解](https://cshihong.github.io/2019/04/03/IPSec-VPN%E4%B9%8BIKE%E5%8D%8F%E8%AE%AE%E8%AF%A6%E8%A7%A3/)