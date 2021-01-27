---
title: Manjaro+微星B365M主板设置wol
date: 2020-12-29 12:00
toc: true
author: shepherd
categories: [个人技术心得,Linux]
tag: [wol,manjaro,archlinux]
---

 wol(wake on Lan)

<!-- more -->

1. 首先需要在主板上设置`网络唤醒，PCI唤醒`
2. Manjaro系统安装`ethtool`工具， 查看网卡是否支持wol

```bash
> sudo ethtool eno1
Supports Wake-on: pumbg
        Wake-on: g
```

3. 如果Wake-on参数是d(disabled)，使用指令`ethtool -s NIC_name wol g`设置成g(magic packet activity)

4. 查看tlp服务, 将tlp服务设置成开启自启

   - `sudo systemctl status tlp`
   - `sudo systemctl enable tlp`

5. 更改tlp配置

   ```bash
   > vim /etc/tlp.conf
   
   TLP_ENABLE=1
   WOL_DISABLE=N
   ```

   ## 其他
   
   无显示器设置x11vnc分辨率
   
   1. 安装`xf86-video-dummy`
   
   ```bash
   ❯ sudo pacman -S dummy           
   ```
   
   2. 添加配置文件
   
   ```bash
   ❯ sudo vim /usr/share/X11/xorg.conf.d/xorg.conf
   
   Section "Device" 
       Identifier  "Configured Video Device"
       Driver      "dummy"
   EndSection
    
   Section "Monitor"
       Identifier  "Configured Monitor"
       HorizSync 31.5-48.5
       VertRefresh 50-70
   EndSection
    
   Section "Screen"
       Identifier  "Default Screen"
       Monitor     "Configured Monitor"
       Device      "Configured Video Device"
       DefaultDepth 24
       SubSection "Display"
       Depth 24
       Modes "1024x800" 
       EndSubSection
   EndSection
   ```
   
   3. reboot

