---
thumbnail:
title: 动态调试-OD
date: 2021-04-07 12:00
tags:
categories: 
toc: true
recommend: 1
keywords: 
uniqueId: 逆向破解/动态调试-OD.html
mathJax: false
---

> **OllyDbg**（以其作者Oleh Yuschuk的名字命名）是一个[x86](https://en.wikipedia.org/wiki/X86) [调试器](https://en.wikipedia.org/wiki/Debugger)，它着重于二进制代码分析。可以跟踪[寄存器](https://en.wikipedia.org/wiki/Processor_register)，识别[过程](https://en.wikipedia.org/wiki/Function_(computer_science))，[API](https://en.wikipedia.org/wiki/Application_programming_interface)调用，[开关](https://en.wikipedia.org/wiki/Switch_statement)，[表](https://en.wikipedia.org/wiki/Table_(information))，[常量](https://en.wikipedia.org/wiki/Constant_(computer_science))和[字符串](https://en.wikipedia.org/wiki/String_(computer_science))

<!-- more -->

## 界面功能

![od1](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/od01.png)

## 快捷键

![od02](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/od02.png)

## 破解方向(无壳)

- 从消息框入手(MessageBox, GetDlgItemTextA...)
- 从提示字符串入手
    - 比如提示消息窗口时暂停程序然后从调用堆栈里查找关键信息
    - 直接查找字符串跟随地址分析

> 不建议不断使用断点进行调试, 大概率陷入死循环(windows使用消息队列将各种操作分配给应用程序, 如果没有从窗口执行操作, 那会导致消息队列为空, 导致循环)
>
> ![](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/od03.png)

## 去除NAG窗口

Nag窗口就是软件的提示注册信息

找到调用窗口函数后可以通过以下方式解决它

- 改标志位
- 改跳指令(比如je-->jmp)
- 使用nop填充(一个nop占一字节)
- 使窗口父句柄不存在
-  改入口地址(PE头的AddressOfEntryPoint)

## 技巧

- call的返回值会赋值给EAX
- 找关键语句时需要注意领空, 一般修改的都是程序的领空而不是系统API的领空

## 术语参照

- `领空`: 在某时刻CPU执行的代码的所有者, 004013F7一般是执行文件的领空, 7C8114AB一般是DLL的领空
-  `VA(VirtualAdress)`
-  `RVA(RelativeVirtualAddress)`
- ``EP(EntryPoint)``
- `SEH(Structrued Exception Handling)`

