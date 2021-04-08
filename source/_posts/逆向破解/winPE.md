---
thumbnail:
title: winPE结构
date: 2021-4-7 13:00
tags:
categories: 
toc: true
recommend: 1
keywords: 
uniqueId: 逆向破解/winPE结构.html
mathJax: false
---
> PE(ProtbaleExecutable)可执行文件结构是一种规范, 用来指导系统如何执行你设计的程序.
>
> windows编译器会将代码以PE的形式编译链接成可执行文件.
>
> PE的优势就是它在硬盘的存储结构和在内存的存储结构是一样的
>
> [官方解释](https://docs.microsoft.com/en-us/windows/win32/debug/pe-format)
<!-- more -->
## windows PE结构

- PE结构整体上可分为`头+节区(区块)`, 头负责引导win加载器找区块的内容



