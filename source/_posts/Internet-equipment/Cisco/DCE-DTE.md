---
title: DCE和DTE的区别
toc: true
recommend: 1
uniqueId: '2021-04-11 06:31:57/DCE和DTE的区别.html'
mathJax: false
date: 2021-04-11 14:31:57
thumbnail: 
tags: [DCE,DTE]
categories: [网络设备配置,Cisco]
keywords:
---
> [**data circuit-terminating equipment**](https://en.wikipedia.org/wiki/Data_circuit-terminating_equipment#cite_note-TIA_1997_232F-1) (**DCE**) 
>
> DCE是数据通信设备，如MODEM，连接DTE设备的通信设备。(一般广域网常用 [DCE设备](http://baike.baidu.com/view/536354.htm) 有：CSU/DSU，广域网 [交换机](http://baike.baidu.com/view/1077.htm) ，MODEM)
>
> DTE设备是[终端](https://en.wikipedia.org/wiki/Terminal_(telecommunication))（或[计算机](https://en.wikipedia.org/wiki/Computer)）

<!-- more -->

DTE和DCE只是针对串行端口的，路由器通常通过串行端口连接广域网络(串口便宜)

- DTE是针头（俗称 [公头](http://baike.baidu.com/view/2944899.htm) ），DCE是孔头（俗称 [母头](http://baike.baidu.com/view/3572688.htm) ）
- DTE,DCE的之间的区别是DCE一方提供时钟，DTE不提供时钟，但它依靠DCE提供的时钟工作
- DCE,它在DTE和传输线路之间提供信号变换和编码功能，并负责建立、保持和释放链路的连接

> 参考文章
>
> [DTE和DCE详解](https://blog.csdn.net/wangyunqian6/article/details/6371130?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EOPENSEARCH%7Edefault-3.control&dist_request_id=1330147.22499.16181241610311079&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EOPENSEARCH%7Edefault-3.control)