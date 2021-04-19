---
title: MSTP
toc: true
recommend: 1
uniqueId: '2021-04-18 11:51:40/MSTP.html'
mathJax: false
date: 2021-04-18 19:51:40
thumbnail:
tags:
categories: [2021职业技能大赛-信息安全管理与评估]
keywords:
---
>  了解MSTP, 在CS6200上进行配置

<!-- more -->

## 简介

> 它应用RSTP的快速收敛特性，允许多个具有相同拓扑的VLAN映射到一个生成树实例上，而这个生成树拓扑同其它生成树实例相互独立。这种机制一方面用多重生成树实例为映射到它的VLAN的数据流量提供了独立的发送路径，实现不同实例间VLAN数据流量的负载分担；另一方面，若干个VLAN共享同一个拓扑实例（MSTI），同每个VLAN对应一个生成树（PVST）的实现方法相比，大大减少了每个网桥需要维持的生成树实例的数量，节约了CPU资源

> MSTP把一个交换网络划分成多个域，每个域内形成多棵生成树，生成树之间彼此独立。每棵生成树叫做一个多生成树实例MSTI（Multiple Spanning Tree Instance），每个域叫做一个MST域（MST Region：Multiple Spanning Tree Region）
>
> 域用来解决如何判断某个VLAN映射到哪个生成树实例的问题

- **在同一个MST域（MST Region）必须满足以下条件**

  -  都启动了MSTP
  - **域名**（Region Name）
  - **修订级别**（Revision Level）
  - **格式选择器**（Configuration Identifier FormatSelector）
  -  **VLAN与实例的映射关系**（mapping of VIDs to spanning trees）...

- **VLAN映射表：**

  - VLAN映射表是MST域的属性，它描述了VLAN和MSTI之间的映射关系

  - 在BPDU里是一个摘要, 该摘要是根据映射关系计算得到的一个16字节签名

- **CST**

  公共生成树CST（Common Spanning Tree）是**连接交换网络内所有MST域**的一棵生成树。

  如果把每个MST域看作是一个节点，CST就是这些节点通过STP或RSTP协议计算生成的一棵生成树。

- **IST**

  内部生成树IST（Internal Spanning Tree）是**各MST域内**的一棵生成树。

  IST是一个特殊的MSTI，MSTI的ID为0，通常称为MSTI0。

  IST是CIST在MST域中的一个片段。

- **SST**

  运行STP或RSTP的交换设备只能属于一个生成树。

  MST域中只有一个交换设备时，这个交换设备构成单生成树。

- **CIST**

  *所有MST域的IST+CST*即构成了一个完整的生成树, 即CIST

- **总根**

  总根是CIST（Common and Internal Spanning Tree）的根桥。

- **域根**

  域根（Regional Root）分为IST域根和MSTI域根。

  一个MST域内可以生成多棵生成树，每棵生成树都称为一个MSTI。MSTI域根是每个多生成树实例的树根。

- **主桥**

  主桥（Master Bridge）也就是IST Master，它是域内距离总根最近的交换设备。

- **端口角色**

  根端口、指定端口、Alternate端口、Backup端口和边缘端口的作用同RSTP协议中定义。

  除边缘端口外，其他端口角色都参与MSTP的计算过程。

  同一端口在不同的生成树实例中可以担任不同的角色。

> 所谓“实例”就是多个VLAN的一个集合。在MSTP中，各个实例拓扑的计算是独立的，一个MSTP实例单独计算一棵生成树，在这些实例上就可以实现负载均衡。使用的时候可以把多个相同拓扑结构的VLAN映射到同一个实例中，这些VLAN在端口上的转发状态将取决于对应实例在MSTP里的转发状态。

## 端口角色

### 外部与内部路径开销ExtRPC＆IntRPC

**外部路径开销**是相对于CIST而言的，同一个域内外部路径开销是相同的；**内部路径开销**是域内相对于某个实例而言的，同一端口对于不同实例对应不同的内部路径开销。

### 域边缘端口

**域边缘端口**是指位于MST域的边缘并连接其它MST域或SST的端口

### Alternate端口

Alternate端口是根端口的**备份端口**，如果根端口被阻塞后，Alternate端口将成为新的根端口

### Backup端口

当同一台交换机的两个端口互相连接时就存在一个环路，此时交换机会将其中一个端口阻塞，Backup端口就是**被阻塞**的那个端口。

从转发用户流量来看，Backup端口，作为**指定端口的备份**

### Master端口

Master端口是MST域和总根相连的所有路径中**最短路径**上的端口，它是交换机上连接MST域到总根的端口。Master端口是域中的报文去往总根的必经之路。

Master端口是特殊域边缘端口，Master端口在IST/CIST上的角色是Root Port，在其它各实例上的角色都是Master。

## 配置

> 我只用3个交换机测试, 所以只有一个域
>
> 即CIST=IST
>
> CIST总根=IST域根

```powershell
# 开启生成树(默认mstp), 开启后才能设置其他mode域
spanning-tree
# 查看
show spanning-tree
```

### 拓扑



各交换机参数如下(改过S1的优先级):

```powershell
S1#show spanning-tree 

*********************************** Process 0 ***********************************
                 -- MSTP Bridge Config Info --

Standard     :  IEEE 802.1s
Bridge MAC   :  00:03:0f:91:05:2f
Bridge Times :  Max Age 20, Hello Time 2, Forward Delay 15
Force Version:  3

########################### Instance 0 ###########################
Self Bridge Id   : 28672.00:03:0f:91:05:2f
Root Id          : this switch
Ext.RootPathCost : 0
Region Root Id   : this switch
Int.RootPathCost : 0
Root Port ID     : 0
Current port list in Instance 0:  
Ethernet1/0/1 Ethernet1/0/2 Ethernet1/0/3 (Total 3)

   PortName           ID      ExtRPC   IntRPC  State Role     DsgBridge          DsgPort
-------------- ------------ --------- --------- ---  ---- ------------------ ------------
  Ethernet1/0/1   128.00001          0         0 FWD  DSGN 28672.00030f91052f   128.00001
  Ethernet1/0/2   128.00002          0         0 FWD  DSGN 28672.00030f91052f   128.00002
  Ethernet1/0/3   128.00003          0         0 FWD  DSGN 28672.00030f91052f   128.00003
 
S2#show spanning-tree 

*********************************** Process 0 ***********************************
                 -- MSTP Bridge Config Info --

Standard     :  IEEE 802.1s
Bridge MAC   :  00:03:0f:91:05:b0
Bridge Times :  Max Age 20, Hello Time 2, Forward Delay 15
Force Version:  3

########################### Instance 0 ###########################
Self Bridge Id   : 32768.00:03:0f:91:05:b0
Root Id          : 28672.00:03:0f:91:05:2f
Ext.RootPathCost : 0
Region Root Id   : 28672.00:03:0f:91:05:2f
Int.RootPathCost : 20000
Root Port ID     : 128.3
Current port list in Instance 0:  
Ethernet1/0/3 Ethernet1/0/4 (Total 2)

   PortName           ID      ExtRPC   IntRPC  State Role     DsgBridge          DsgPort
-------------- ------------ --------- --------- ---  ---- ------------------ ------------
  Ethernet1/0/3   128.00003          0         0 FWD  ROOT 28672.00030f91052f   128.00003
  Ethernet1/0/4   128.00004          0     20000 BLK  ALTR 32768.00030f90ce0d   128.00004
  
S3#show spanning-tree 

*********************************** Process 0 ***********************************
                 -- MSTP Bridge Config Info --

Standard     :  IEEE 802.1s
Bridge MAC   :  00:03:0f:90:ce:0d
Bridge Times :  Max Age 20, Hello Time 2, Forward Delay 15
Force Version:  3

########################### Instance 0 ###########################
Self Bridge Id   : 32768.00:03:0f:90:ce:0d
Root Id          : 28672.00:03:0f:91:05:2f
Ext.RootPathCost : 0
Region Root Id   : 28672.00:03:0f:91:05:2f
Int.RootPathCost : 20000
Root Port ID     : 128.2
Current port list in Instance 0:  
Ethernet1/0/2 Ethernet1/0/4 (Total 2)

   PortName       ID      ExtRPC   IntRPC  State Role     DsgBridge      DsgPort
-------------- -------- --------- --------- ---  ---- ------------------ --------
 Ethernet1/0/2 128.002          0         0 FWD  ROOT 28672.00030f91052f 128.002
 Ethernet1/0/4 128.004          0     20000 FWD  DSGN 32768.00030f90ce0d 128.004

```

- `Current port list in Instance 0:  `默认所有vlan都映射到intance 0
- `intRPC`: 内部开销
- `extRPC`: 外部开销
- `Region Root Id`: 域根
- `Root Port ID: 128.3`: 根端口(port_pri.vlan_id)
- `DsgBridge`: 指定桥, 上游交换机给我发的BPDU的桥ID(bridge_pri.mac)
- `Designate Port`: 上游交换机给我发BPDU的端口

### 选举根桥

接收BPDU, 比较BID-->先比较优先级，优先级值越小，优先级越高。如果优先级相同，则比较MAC地址大小，越小越优

```powershell
# 更改优先级
S3(config)#spanning-tree priority ?
  <0-61440>  Priority value <0-61440>
```

### 选举端口角色



> 参考
>
> [mstp](https://cshihong.github.io/2017/11/29/MSTP%E5%A4%9A%E5%8C%BA%E5%9F%9F%E7%94%9F%E6%88%90%E6%A0%91%E5%8D%8F%E8%AE%AE/)
>
> [这篇MSTP是真的爱了！](https://bbs.huaweicloud.com/blogs/220510)(图解易懂)