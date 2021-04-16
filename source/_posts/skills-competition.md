---
title: 2021职业技能大赛-信息安全管理与评估
toc: true
recommend: 1
uniqueId: '2021-04-13 03:21:30/skills_competition.html'
mathJax: false
date: 2021-04-13 11:21:30
thumbnail:
tags:
categories: 
keywords:
---
> 摘要

<!-- more -->

## VLSM&CIDR

如果说vlsm是将子网掩码细分, 那CIDR就是将子网掩码汇总

用来规划网络

## 串口工具

`sudo pacman -S picocom`

### 使用

`sudo picocom -b 波特率 device`

`ctrl-a` 进入转义模式

`ctrl-h` 帮助

## cisco三层交换机

- `no switchport`启用路由端口
- `ip routing`启用路由功能
- 路由端口不支持子接口
- 路由端口不支持二层协议(并不是全部)
- 创建SVI要保证VLAN在VLAN数据库内

## 神州交换机配置

### vlan

```powershell
# vlan brief
Sw(config-if-ethernet1/0/3)#show vlan 
```

- 神州默认VLAN是可以互相通信的(自动启用路由功能)

### telnet

```powershell
# 配置用户
username <username> [privilege <privilege>] password (0 | 7) <password>
# 开启服务
telnet-server enable
# 启用ACL
authentication line vty login local
```

### http

```powershell
ip http server
```

### ssh

```powershell
# 生成密钥
ssh-server host-key create rsa modulus <768-2048>
# 开启服务
ssh-server enable
```

> 神州交换机的ssh版本有点老, 自带的ssh客户端可能连不上, 需要加一些参数
>
> [ssh 登录旧设备的问题解决](https://www.zhihu.com/column/p/30840210)

### stp

```powershell
# 开启生成树(默认mstp)
spanning-tree
# 查看
show spanning-tree
```

### 交换机MAC与IP绑定

```powershell
Sw(config)#am enable               
Sw(config)#interface ethernet 1/0/1 
Sw(config-if-ethernet1/0/1)#am port 
Sw(config-if-ethernet1/0/1)#am mac-ip-pool 00:90:9e:9a:a0:60 10.1.128.24
Sw(config)# show am interface ethernet 1/0/1
AM is enabled
Interface Ethernet1/0/1 
    am port
    am mac-ip-pool  00-90-9e-9a-a0-60 10.1.128.24
```

### 交换机绑定MAC

> 可以防止MAC泛洪

```powershell
Sw(config)#interface ethernet 1/0/1
Sw(config-if-ethernet1/0/1)#switchport port-security
# 静态绑定
Sw(config-if-ethernet1/0/1)#switchport port-security 00:90:9e:9a:a0:60
# 可设置MAC数量
switchport port-security max cnt
# 动态学习
Sw(config)#mac-address-learning cpu-control 
Sw(config)#show port-security address      

Secure Mac Address Table                          
-------------------------------------------------------------------------------------  
Vlan                Mac Address                             Type                Ports               
1                   00-90-9e-9a-a0-60                       SECURED             Ethernet1/0/1       
Total Addresses:1

```

### ACL

> 建议使用命名ACL

神州交换机的ACL设置语句语法与CISCO的基本一样, 使用有以下区别

```powershell
# 如果要启用ACL, 必须使用以下指令
Sw(config)#firewall enable 
# 可以将ACL应用于Telnet/ssh/web, test是我配置的命名ACL
Sw(config)#authentication ip access-class test in telnet 

Sw(config)#show access-group interface ethernet 1/0/1
interface name:Ethernet1/0/1
    IP Ingress access-list used is test, traffic-statistics Disable.
Sw(config)#show access-lists 
ip access-list standard test(used 1 time(s)) 2 rule(s)
   rule ID 1: deny 192.168.1.0 0.0.0.255
   rule ID 3: deny 10.1.128.0 0.0.0.255

```

###  DCN6200的SVI操作

> 没有cisco的`no switchport`指令, 将接口加入vlan就行了

目标: 让两台三层交换机下不同VLAN的PC互联

PC1:

```shell
sudo route add -net 192.168.20.0 netmask 255.255.255.0 gw 192.168.10.1
```

ip: 192.168.10.2

gw: 192.168.10.1

PC2:

ip: 192.168.20.2

gw: 192.168.20.1

S1:

vlan10: 192.168.10.1/24

vlan2: 192.168.2.1/24

S2:

vlan20: 192.168.20.1/24

vlan2: 192.168.2.2/24

```powershell
S1(config)#vlan 10
S1(config-vlan10)#vlan 2            
S1(config-vlan2)#switchport interface            
S1(config-vlan2)#switchport interface ethernet 1/0/3
S1(config-vlan2)#exit
S1(config)#interface vlan 2
S1(config-if-vlan2)#ip address 192.168.2.1 255.255.255.0
S1(config-if-vlan2)#exit                
S1(config)#interface vlan 10
S1(config-if-vlan10)#ip address 192.168.10.1 255.255.255.0
S1(config-if-vlan10)#exit
S1(config)#interface ethernet 1/0/1
S1(config-if-ethernet1/0/1)#switchport mode access 
S1(config-if-ethernet1/0/1)#switchport access vlan 10
S1(config)#ip route 192.168.20.0 255.255.255.0 192.168.2.2
```

```powershell
S2(config)#vlan 20
S2(config-vlan20)#exit
S2(config)#interface vlan 20
S2(config-if-vlan20)#ip address 192.168.20.1 255.255.255.0
S2(config-if-vlan20)#exit
S2(config)#vlan 2
S2(config-vlan2)#exit
S2(config)#interface vlan 2
S2(config-if-vlan2)#ip address 192.168.2.2 255.255.255.0
S2(config-if-vlan2)#exit
S2(config)#ip route 192.168.10.0 255.255.255.0 192.168.2.1
S2(config)#interface ethernet 1/0/3
S2(config-if-ethernet1/0/3)#switchport mode access           
S2(config-if-ethernet1/0/3)#switchport access vlan 2
```

### RIPv2

与思科基本一致

`show ip route rip `显示RIP学习到的路由

`show ip protocol`查看RIP详情

### OSPFv2

> v2适用于IPv4, v3适用于IPv6

- 相同的域共享相同的LSDB

- 0代表主干域

> OSPF的区域以Backbone（骨干区域）作为核心，该区域标识为0域，所有的其他区域都必须与0域在逻辑上相连，0域必须保证连续。

```powershell
S1(config)#router ospf 
S1(config-router)#network 192.168.10.0/24 area 0
S1(config-router)#network 192.168.2.0/24 area 0 
S1(config-router)#show ip route ospf  

S2(config)#router ospf
S2(config-router)#network 192.168.2.0/24 area 0
Apr 16 20:00:56:000 2021 S1 DEFAULT/7/:[OSPF]Neighbor [Vlan2:192.168.2.1-192.168.20.1]: Status change Loading -> Fulls
S2(config-router)#network 192.168.20.0/24 area 0
S2(config-router)#show ip route
Codes: K - kernel, C - connected, S - static, R - RIP, B - BGP
       O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default

C       127.0.0.0/8 is directly connected, Loopback  tag:0
C       192.168.2.0/24 is directly connected, Vlan2  tag:0
O       192.168.10.0/24 [110/2] via 192.168.2.1, Vlan2, 00:00:30  tag:0
C       192.168.20.0/24 is directly connected, Vlan20  tag:0
Total routes are : 4 item(s)
```

### DHCP

```powershell
S1(config)#ip dhcp pool manu
S1(dhcp-manu-config)#network-address 192.168.10.1 24
S1(dhcp-manu-config)#exit
S1(config)#ip dhcp pool manu              
S1(dhcp-manu-config)#default-router 192.168.10.1
S1(dhcp-manu-config)#exit
S1(config)#service dhcp

# 中继(设置其他DHCP服务器)
ip forwark-protocol udp bootps
int vlan_id
ip helper-address dhcp_server_ip
```

### DHCP侦听

> 作用是屏蔽接入网络中的非法的DHCP服务器。即开启 DHCP Snooping 功能后，网络中的客户端只有从管理员指定的DHCP服务器获取IP地址。 由于DHCP报文缺少认证机制，如果网络中存在非法DHCP服务器，管理员将无法保证客户端从管理员指定的DHCP服务器获取合法地址，客户机有可能从非法DHCP服务器获得错误的IP地址等配置信息，导致客户端无法正常使用网络。

- 建议将连接[DHCP](https://zh.wikipedia.org/wiki/DHCP)服务器的端口设置为信任端口，其他端口设置为非信任端口。

```powershell
S1(config)#ip dhcp snooping enable 
# 记录非法信息
S1(config)#ip dhcp snooping blocked record enable
# 信任口
S1(config-if-ethernet1/0/1)#ip dhcp snooping trust
```

### 加密

```powershell
S2(config)#service password-encryption
show run
username test password 7 098f6bcd4621d373cade4e832627b4f6
```

