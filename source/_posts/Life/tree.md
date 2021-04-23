---
title: life-tree
date: 2020-11-14 21:37:26
author: manu
categories: [生活]
tags: [life]
toc: true
---

> 积累的人生树, 记录我生活的日志.

<!-- more -->

## Fri Nov 13 CST 2020

- 复习了iptables, route, arp等知识

## Sat Nov 14 CST 2020

- Android+Termux+adb实现手机上使用adb控制手机([跳转文章](../个人技术心得/Android/Termux+adb.md))


## Sun Nov 15 CST 2020

- count+1


- English translate

## Mon Nov 16 CST 2020

- 路由选择

    细节: 一般情况下, 优先选择最长的子网掩码的路由, 如果有多条路由, 则匹配管理距离, 管理距离小的路由优先, 如果管理距离相同, 再匹配度量值, 度量值小的优先, 如果度量值相同, 则选择负载均衡, 具体的方式看采用哪种路由协议和相关的配置

- English translate 

## Tue Nov 17 CST 2020

- 深入archwiki配置了netctl-auto, 网卡别名(udev), 及一些iproute2, wireless指令

## Wed Nov 18 CST 2020

- wol(wake up on lan)
- ethtool
- English Grammer

## Thu Nov 19 CST 2020

- 在b站上看到炬峰整蛊劝退学Linux(在桌面上弹出窗口), 我决定复习下X window
- LVM, RAID
- count+2

## Fri Nov 20 CST 2020

- 纠结了大白菜的md5加密格式, 未果
- 手动给win7, win10装adb驱动, 未果(还是linux好用)

- startx是一个脚本, 提供给xinit参数的脚本

## Sat Nov 21 CST 2020

- 通过修改android_winusb.inf, 添加c:\Documents and Settings\user\adb_usb.ini(content:0xVID)解决了adb驱动问题, 但是termux出现了无法授权的问题, 原因是手机无法授权两个adb客户端同时连接, 且手机重新安装了一遍adb才会出现RSA密钥授权框

## Sun Nov 22 CST 2020

- 摆弄了virtualbox并立下了学汇编的flag(为了逆向, 系统)
- 海岛升级16本

## Mon Nov 23 CST 2020

- 学逆向中

## Tue Nov 24 CST 2020

- Perhaps one day, we'll all be computers.
- 理清C的typedef(封装)和#define(替换)的区别
- typedef的用法

## Wed Nov 25 CST 2020

- 修复picgo和笔记
- 学逆向
- windows异性框(XOR+黑白遮罩+OR+XOR)

## Thu Nov 26 CST 2020

- 开始尝试破解增霸卡(失败)
- CM01
- 学习windows逆向
- 什么是字节序? why?[大端模式和小端模式](https://zhuanlan.zhihu.com/p/97821726)

## Fri Nov 27 CST 2020

- 知识不硬, 不要乱搞.
- Game

## Sat Nov 28 CST 2020

- none

## Sun Nov 29 SCT 2020

- ProtbaleExecutable
- OD-调用推栈

## Mon Nov 30 CST 2020

- OD-软件断点和硬件断点
- 忽略异常

## Tue Dec 1 CST 2020

- QQ机器人([mirai](https://github.com/mamoe/mirai))
- c+

## Wed Dec 2 CST 2020

- 使用[graia-application-mirai](https://github.com/GraiaProject/Application)(基于[mirai-http-api](https://github.com/project-mirai/mirai-api-http)的python SDK)

    注意mirai-http-api支持的mirai版本, 目前使用mirai-console-1.0-M4.jar(后端),mirai-console-pure-1.0-M4.jar(前端),mirai-core-qqandroid-1.2.3.jar工作正常

## Thu Dec 3 CST 2020

-  重温py准备写一个QQbot-COC插件
- 顺带爬pixiv

## Fri Dec 4 CST 2020

- none

## Sat Dec 5 CST 2020

- none

## Sun Dec 6 CST 2020

- 今天强迫症发作, 移除有关manu, manuev的所有信息, manu, manu2x, runtmanu, yangchaohe成为我的虚拟昵称(包括邮箱地址)
- c+5

## Tue Dec 8 CST 2020

- 动态路由(clock rate与dce,dte的关系, rip_v1和rip_v2关于summary的细节)
- vc+1

## Wed Jan 11 CST 2021

- 考过科二

## Thu Jan 28 CST 2021

- (看不懂[NPE问题])[如果调用方一定要根据null判断，比如返回null表示文件不存在，那么考虑返回`Optional`](https://www.liaoxuefeng.com/wiki/1252599548343744/1337645544243233)：

    ```java
    public Optional<String> readFromFile(String file) {
        if (!fileExist(file)) {
            return Optional.empty();
        }
        ...
    }
    ```

    这样调用方必须通过`Optional.isPresent()`判断是否有结果

## Fri Jan 29 CST 2021

- Commons Logging+Log4j; SLF4j +logback
- 动态代理+注解

## Fri Mar 12 CST 2021

1. 想学的东西太多了, 一步一步来, 不要浮躁, 先把当前该学的学了(比如网络, 和后端, 前端)
