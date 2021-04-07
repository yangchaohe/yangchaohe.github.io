---
thumbnail: https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/thumbnail/manjaro/school-project.jpg
title: 在Manjaro上使用virtualbox
date: 2020-5-2
author: shepherd
toc: ture
categories: [个人技术心得,Linux]
tags: [manjaro,virtualbox,虚拟机]
---

### 安装问题

使用`pacman -S virtualbox`后，打开创建新的新的虚拟机出现错误

```bash
WARNING: The vboxdrv kernel module is not loaded. Either there is no module
         available for the current kernel (5.4.35-1-MANJARO) or it failed to
         load. Please recompile the kernel module and install it by

           sudo /sbin/vboxconfig

         You will not be able to start VMs until this problem is fixed.
```

<!-- more -->

说模块没有加载成功，需要使用`sudo /sbin/vboxconfig`修复，但实际上没有这个文件

参考[在 Arch 里安装 VirtualBox](https://wiki.archlinux.org/index.php/VirtualBox_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))这篇文章后，我安装了两个模块

1. virtualbox-host-dkms(需要看自己的内核版本安装, 比如我的是linux58-virtualbox-host-modules)
2. linux-lts-headers

查看模块加载情况

```bash
# shepherd @ MY in ~ [14:04:17] C:1
$ sudo vboxreload                  
Unloading modules: 
Loading modules: vboxnetadp vboxnetflt vboxdrv 
```

然后重新打开virtualbox，运行正常

![virtualbox](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/2020/vm-virtualbox.png)

## 代理问题

网络使用NAT时, 虚拟机的网关其实就是物理机的localhost, 所以只需要在代理处填写`网关ip:物理机代理端口`就行了

> 其实我考虑过端口转发, vbox设置的端口转发好像只支持从物理机转发到虚拟机
>
> 在host-only下, win7的防火墙会挡住来自主机的访问