---
title: unzip乱码
toc: true
recommend: 1
keywords: 
uniqueId: '2021-04-10 07:41:44/unzip-Garbled.html'
mathJax: false
date: 2021-04-10 15:41:44
thumbnail:
tags: unzip,unar
categories: [个人技术心得,Linux]
---
>  arclinux,manjaro解决unzip不能指定编码问题

<!-- more -->

安装`kde-servicemenus-unarchiver`

```shell
yay -S kde-servicemenus-unarchiver
```

使用`-e`指定编码

```shell
 unar -e GBK test.zip
```

