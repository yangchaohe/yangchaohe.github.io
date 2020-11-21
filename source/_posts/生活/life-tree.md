---
title: life-tree
date: 2020-11-14 21:37:26
author: shepherd
categories: [生活]
tags: [life]
---

> 积累的人生树, 记录我生活的日志.

<!-- more -->

## Fri Nov 13 CST 2020

- 复习了iptables, route, arp等知识

## Sat Nov 14 CST 2020

- Android+Termux+adb实现手机上使用adb控制手机

    探究原理: 

    1. 我们知道手机通过USB连接电脑可以进行adb调试, 电脑需要准备adb-tools, adb是C/S架构, 打开USB调试后手机就是客户端, 电脑就是服务端, 电脑绑定在TCP端口5037, 手机也绑定在5037端口, 电脑会去扫描手机5555-5585的端口查找模拟器, 从而建立连接, 服务器可以连接多个设备
    2. 通过这个原理, 我想到了在Termux里安装adb-tools, adb启动后成为服务端, 如下:

```bash
* daemon not running. starting it now at tcp:5038 *
#有点意外, 不是5037, 感觉是客户端在通信时占用5037造成的
* daemon started successfully *
```

​		因为手机打开USB调试, 所以Termux会自动连接到模拟器, 从而实现无需电脑, 无需root, 手机自己就可完成adb指令. so, adb可以做哪些有趣的事呢?	

- adb可以做什么?

    > 启动adb服务: `adb start-server`
    >
    > 关闭adb服务: `adb kill-server`
    >
    > 多设备记得使用`-s`指定

    端口转发: `adb forward tcp:8080 tcp:8090`, 将本机的8080转发到其他设备的8090, `adb reverse`反向转发

    交互式shell: `adb shell`

    单命令式shell: `adb shell [command]`

    > 查看可用指令: `adb shell ls /system/bin`

    活动管理: `adb shell am -h `

    包管理: `adb shell pm -h`

    截图: `adb shell screencap /sdcard/screen.png`
    
    录视频: `adb shell screenrecord /sdcard/demo.mp4`

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
- 

