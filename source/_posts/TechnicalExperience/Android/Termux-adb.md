---
title: Termux+adb
date: 2020-11-22 21:37:26
author: manu
toc: true
categories: [个人技术心得,Android]
tags: [Termux,adb]
---

 手机可以直接使用termux+adb调试手机, 无需电脑, 无需root
<!-- more -->

## 探究原理

1. 我们知道手机通过USB连接电脑可以进行adb调试, 电脑需要准备adb-tools, adb是C/S架构, 打开USB调试后手机就是客户端, 电脑就是服务端, 电脑绑定在TCP端口5037, 手机也绑定在5037端口, 电脑会去扫描手机5555-5585的端口查找模拟器, 从而建立连接, 服务器可以连接多个设备
2. 通过这个原理, 我想到了在Termux里安装adb-tools([项目地址](https://github.com/MasterDevX/Termux-ADB)), adb启动后成为服务端, 如下:

```bash
* daemon not running. starting it now at tcp:5038 *
#有点意外, 不是5037, 感觉是客户端在通信时占用5037造成的
* daemon started successfully *
```

因为手机打开USB调试, 所以Termux会自动连接到模拟器, 从而实现无需电脑, 无需root, 手机+termux就可完成adb指令. so, adb可以做哪些有趣的事呢?	

## adb可以做什么?

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

> 值得注意的是一个android设备只能授权给一个客户端, 比如已经给termux授权过后又给电脑usb是没用的