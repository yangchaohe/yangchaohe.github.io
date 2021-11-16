## 2021-11-13

life: 不要纠结细节问题，学到最后终得解
learn: 按照 Morty 老师的方法学习英语

## 2021-09-08

tool: Chrome 支持将路径转为 curl
code: 使用phpunit进行测试

## 2021-09-06

todo: PHP

1. Laravel 开发 Web 项目 (65%)
2. PHP 1000h 计划 (16h+45min*22)

## 2021-09-05

todo: PHP

1. Laravel 开发 Web 项目 (62%)
2. PHP 1000h 计划 (16h+45min*20)

## 2021-09-02

tool: Shift + 鼠标滚轮：横向滚动
os: 并发和并行的区别

并发：cpu 执行 a 任务的一部分后，又去执行 b 任务的一部分(程序里的多线程)
并行：多核cpu中，a cpu 执行 a 任务，b cpu 执行 b 任务(操作系统决定)
## 2021-08-29

todo: PHP

1. Laravel 开发 Web 项目 (42%)
2. PHP 1000h 计划 (16h+45min*14)

## 2021-08-24

tool: vim 恢复文件

`vim -r filename`

todo: PHP

1. Laravel 开发 Web 项目 (40%)
2. PHP 1000h 计划 (16h+45min*7)

## 2021-08-23

todo: PHP

1. Laravel 开发 Web 项目 (40%)
2. PHP 1000h 计划 (16h+45min*7)

## 2021-08-22

todo: PHP

1. Laravel 开发 Web 项目 (35%)
2. PHP 1000h 计划 (10h+45min*12)

## 2021-08-21

life: -79￥

tool: kde

更新后报错：无法创建输入输出后端。klauncher 回应：找不到插件“/usr/lib/qt/plugins/kf5/kio/file.so”。

解决方法：「dbus-launch dolphin」

todo: PHP

1. Laravel 开发 Web 项目 (0%)
2. PHP 1000h 计划 (10h+45min*3)

life: 人的大脑一下子暴露在太多的新概念下，会使人变得焦躁。

## 2021-08-19

life: Don't ever grow up. Play on!

code: 设计模式

1. SOLID原则

code: [并发编程——原子性，可见性和有序](https://blog.c sdn.net/eff666/article/details/66473088)

todo: PHP

1. Laravel 开发 Web 项目 (0%)
2. PHP 1000h 计划 (10h)

## 2021-08-17

tool: git 从其他分支获取文件

`git > 2.23`: `git restore -s <branch_name> -- <file/dir_path>`

`git <= 2.23`: `git check <branch_name> -- <file/dir_path>`

## 2021-08-15

code: 好的编程习惯

1. 继承表示「是一个」的关系
2. 单例和链式调用都要慎用

## 2021-08-14

code: 命令行输出正则匹配的组

```bash
echo One Infinite Loop, Cupertino 95014 | rg -o "^[^,]+,\s*(.+?)\s*(\d{5})$"  -r '$2'
```

code: 复杂的逻辑 **必须** 使用流程图梳理清楚

流程图 **可以** 使用 [Mermaid工具](https://github.com/mermaid-js/mermaid)

## 2020-08-13

code: php

require_once 代价很大

## 2021-08-04

cs: 解决Manjaro在双显示器下帧率为144的屏幕降为60Hz的问题

在/etc/environment里添加`__GL_SYNC_DISPLAY_DEVICE=DP-2`

## 2021-08-03

tool: 解决BP字体锯齿感严重

根源是执行jar没有抗锯齿参数
全局变量添加：`_JAVA_OPTIONS='-Dawt.useSystemAAFontSettings=setting'`
[Java Runtime Environment fonts](https://wiki.archlinux.org/title/Java_Runtime_Environment_fonts_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%80%89%E6%8B%A9%E5%AD%97%E4%BD%93)

## 2021-07-29

code: 优化curl json输出

npm i -g json; curl后重定向至json

code: nodejs配置默认源

`npm set registry https://registry.npmjs.org/`

## 2021-07-28

code: 测试的数据尽量使用真实的数据，方便后期调试

## 2021-07-21

code: php isset和empty的区别

1. isset可以判断null与非null
2. empty可以判断空字符串，空数组

## 2021-07-20

code: php定义常量

1. const定义，不能是表达式，可以出现在类中
2. define定义，不能出现在类中，可以使用表达式

## 2021-07-12

ctf: 文件上传

1. 条件竞争
利用php后端将文件先上传后检测的漏洞，在上传和删除的间隙里进行访问，即可短暂执行该文件
该文件可以植入一个webshell到服务器上

cs: php eval和system的区别, 什么是IDC？什么是Docker？什么是Nginx？

- eval执行php语句，必须以`;`结尾
- systemctl执行系统语句

- IDC全称互联网数据中心，是一个标准的电信专业级机房环境，可以提供服务器托管、租用等服务

- Docker是对Linux容器的封装，Linux容器可以简单理解为轻量级的虚拟机，但开销小得多；容器的出现解决了环境配置麻烦、困难的事情。
- 作用就是提供原始环境，提供弹性的云服务，组建微服务架构

- Nginx的特点是轻量级，抗并发，高度模块化设计，社区活跃

    life: 如果有幸被贵公司录取，我需要学习或者了解些什么

## 2021-07-11

ctf: 文件上传，什么是PWN、Pwn2Own、0day

- 黑名单绕过
    比如将.php设置为黑名单，但Apache将php3,phtml....都解析成php，我们设置成这些后缀绕过
    P.S.: 查看/etc/mime.types里能解析成php的后缀

- PWN: 指攻破设备或系统，发音‘砰’
- Pwn2Own: 国际赛事
- 0day: 指没有被负责编写程序人员发现的漏洞，因为没有用其进行首次攻击，所以叫0day，攻击后就是nday

    cs: php获取前端json格式编码数据

- 前端application/json编码的数据无法使用$\_POST获取
- 使用file_get_contents("php://input")可获取原始post数据

## 2022-07-10

cs: .htaccess认证，apache权限控制、虚拟主机，php opcache，logrotate，rsyslog

使用htpasswd指令创建用户

apache2.2 使用Order,limit,allow,deny进行控制
apache2.4 使用Require进行控制

虚拟主机可以将多个主机名对应一个IP
本地测试时，虚拟主机名必须要在hosts里设置对应的IP
设置虚拟主机必须将原始的主机名也添加进去

apache如何与php通信以及opcache如何工作

复习logrotate,rsyslog

ctf: 文件上传

1. **.htaccess绕过**
通过添加`AddType application/x-httpd-php .png`可以将.png解析成php
2. windows大小写绕过
windows不区分大小写，比如处理.php，我们可以换成.phP
3. %00截断
    - 前提条件：
        magic_quotes_gpc = Off
        PHP 版本小于 5.3.4
    - PHP底层是C语言，字符串结尾使用\x00代表结束。
    - [GET型] 00 截断配合**路径**来截断，抓包看看应该是存在路径信息的，然后直接在**路径**后面使用 %00 来截断一下就可以成功绕过，为啥 %00 直接就可以绕过了呢？这是因为路径信息是从 GET 方式传递个后端的，这样默认会进行一次 URL 解码，%00 解码后就是空字节
    - [POST型] 抓包后同样找路径，添加%00使用URL解码，放包

## 2021-07-09

life: 一份面试初稿
cs: chrome代理本地流量

除了设置localhost在不代理列表外，还需要将`<-loopback>`添加在列表才能代理localhost

## 2021-07-08

life: 第一次面试总结

1. 一定要想好个人简介
2. 带一份纸质简历
3. 拿项目说话，而不是学过了，如果没有项目，那就说没用过吧
4. 建议录音，方便总结
5. 说话一定要流利，不要吞吐
6. 以后还是叫面试官说普通话吧

boring: 又是找工作的一天，打起精神，明天继续

## 2021-07-07

life: 找工作需要注意的事

1. 工作地点和工作内容
2. 薪资待遇
3. 晋升途径

## 2021-07-05

ctf: 文件绕过-MIME

## 2021-07-04

life: 房子终于找到了, 就是有点高
cs: hydra爆破ssh, metasploit简单入门

hydra -l root -x 6:6:a dst_ip ssh -v
metasploit: use cve...;show missing;set RHOST=xxx.xxx.xxx.xxx;exploit

## 2021-07-03

ctf: 文件上传-绕过js

## 2021-07-02

boring: 找工作的一天
cs: 渗透

渗透知识点

- TCP全开扫描: 指一次完整的TCP连接(三次握手)
- TCP半开扫描: 指SYN连接(不容易留下痕迹)

## 2021-06-30

cs: |, 数据隐写

- 管道符'|'的还可以用来单独执行后面的指令
- docx隐写: 自身隐写和压缩包藏匿
- python写了一个取出所有icmp数据包data某个字符

## 2021-06-29

cs: 以后, 所有的commit都采用[Angular 规范](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

该日志也将采用Angular规范, 不过type稍微修改下:

- life: 生活
- cs: 计算机科学, 思想
- tool: 工具
- boring: 闲聊
- blog: 博客
- ctf: CTF 赛事
- learn: 学习

## 2021-06-28

markdown支持的一些icons:

information_source :information_source:
ballot_box_with_check :ballot_box_with_check:
warning :warning:
x :x:
exclamation :exclamation:
heavy_multiplication_x :heavy_multiplication_x:

##  2021-06-27

今天无聊看了下当前博客的字数, 有点意思..

``` bash
-> fd -0  -e md | xargs -0 -L 1 wc -m | awk '{print $1}'| awk '{sum+=$1}END{print sum}'
666156
```

## 2021-06-26

- 不要去管哪个协议属于哪层, 多注意它的作用和原理

- 路由收敛就是当一个路由条目发生变化时, 所有路由会进行同步更新

## 2021-06-19

- 函数编程要点：

    1. 函数可作为变量，参数
    2. 尽量使用表达式，而非语句
    3. 返回新值，不改变原值
    4. 不修改变量，使用递归将状态保存在参数里
    5. 参数一致，结果一致

    > Ref Link
    > [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)

- update&upgrade

    update代表量的变化，upgrade代表质的变化

- 抽象三原则

    DRY，YAGNI，rule of three.

- User space $ Kernel space

- 如何看编程语言文档？

    边看手册边找一些好的代码例子练习（不搞大项目），官网一般都会有大量例子

- mkfifo

    `|`可以将一个指令的stdout给另一个指令，而mkfifo可以创建一个pipe文件，不限制两个指令

    EOF

## 2021-06-18

- js正则断言（断言是程序中的一阶逻辑）

    1. `^`, `$`
    2. `\b`: 单词边界
    3. `\B`: 非单词边界
    4. `x(?=y)`: 零宽正向先行断言
    5. `x(?!y)`: 零宽负向先行断言
    6. `(?<=y)x`: 零宽正向后行断言
    7. `(?<!y)x`: 零宽负向后行断言

- js其他正则字符

    1. `\n`: 最后的第n个子捕获匹配的子字符串
    2. `(?:)`: 非捕获括号, 用来表示可以匹配但是并不存储数据

    > Reference Link
    > [正则表达式的先行断言(lookahead)和后行断言(lookbehind)](https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html)

## 2021-06-17

**理解GPG和PGP协议**

**疏理HTTPS的加密过程**

1. 浏览器通过服务器公钥加密自己生成的对称加密密钥

2. 服务器解密得到对称密钥，使用其加密

*如何保证服务器公钥安全性？*

数字证书，通过机构来认证。可以防止中间人攻击

*如何防止数字证书被修改？*

数字签名

数据证书在是以明文证书数据+私钥加密明文数据后的hash值进行传递的，进行hash主要是为了效率

## 2021-06-15

[解决npm不使用sudo问题](https://github.com/sindresorhus/guides/blob/main/npm-global-without-sudo.md#install-npm-packages-globally-without-sudo-on-macos-and-linux)

## 2021-06-14

最好是精通一种编辑器，并将其用于所有编辑任务。如果不坚持使用一种编辑器，可能会面临现代的巴别特大混乱。

## 2021-05-12

2021年5月7日信息安全比赛省赛的总结：

这次比赛一共有两个阶段：**平台搭建与安全设备配置防护**与**系统安全攻防及运维安全管控**

需要注意的是两个阶段可同时进行（让攻防的同学联上堡垒服务器即可，这台机器可不按拓扑图来）

- 关于设备配置方面：

    使用CRT连接交换机配置，其他设备连接网口在web网页上配置，设备分为两个小阶段，

    一是按照拓扑图将所有设备的接口IP配置好（交换机还要配置VLAN），这方面没什么好说的，学好CISCO的配置就能完成这个小阶段。

    二是设备的安全配置，我这次的交换机主要涉及ACL，port-channel，端口环路检测；防火墙主要涉及洪水攻击防护，规划策略（明白trust和untrust这两个概念就好），对某些服务的拦截等等；web应用防火墙就不说了，根据关键字在图形界面上临场发挥的...

    > 我的学习途径：设备基本都是参考师兄提供的设备手册，手册我放在这个文档的同级目录下了
    >
    > 我的学习笔记：https://yangchaohe.github.io/tags/%E6%8A%80%E8%83%BD%E5%A4%A7%E8%B5%9B-%E4%BF%A1%E6%81%AF%E5%AE%89%E5%85%A8/
    >
    > 笔记基本都是抄的手册和记录自己的一些心得
    >
    > 我的建议：
    >
    > 1. 交换机没必要深入三层协议（RIP,OSPF..）和二层协议（MSTP..），我们主安全配置
    > 2. 注意设备系统版本，参照比赛标准进行学习

- 关于系统安全方面：

    这个阶段也有几大模块，有CMS漏洞（web渗透），PHP代码审计，wireshark抓包分析...主要就是抓flag值，这几乎是涉及计算机知识范围最广的阶段了，计算机网络、web前端、操作系统、数据库、后端.......

    不仅需要理论，还要大量的实践

    > 时间关系我只学了SQL注入，但比赛没有这个项目，所以我也就没能参加这个阶段，但我也想给出一点建议：
    >
    > - hackbar，burpsuite，中国菜刀..几个工具越熟练越好
    > - 我推荐一个这方面的博主https://www.sqlsec.com/
    > - DVWA靶场

## 2021-05-04

今天不得不想一个问题，时间付出了，但真的有收获吗？

我自认看的东西也不少，可要问我学到了什么，我还真回答不出来。

我该在乎下效率的问题了，一个好的学习方法才能够提高我的效率。

所以我想归纳一下我以后的学习方法（看了编程指北的文章有感）

- 看书要**把脉络理清**，**抓住主线**进行学习

- **细节留给实践再补充**

- 刚开始入门编程时，我喜欢抄书，入门确实挺不错的，但到后面就有点费时间了，知识点过多，细节也多，所以我准备使用思维导图的形式记录我的学习过程

- 大二的我没有了看视频入门的习惯，觉得视频太老，不专业．．喜欢去官网硬啃（哪怕是英文）

    但现在想了想，老的视频也是他的历史，了解历史才会知道为什么会这样发展

- 在网上收集资料确实有必要单独记录

    暂时就这么多吧．．

    思维导图等我比赛完毕在写页面吧．．

## 2021-05-03

反射型XSS，存储型XSS

## 2021-05-02

今天一天都在倒腾.zshrc，我又走向了我最不想走的道路

## 2021-05-01

引用国光大佬的一句话：**不要学习折腾一些无关紧要的技术，时间很宝贵，得花在更有意义事情上面。**

今天收集了各种工具，hackbar，BP

## 2021-04-30

今天学到了通过sql注入点获取该数据库的下的所有表，所有字段信息，还有udf提权，👌睡觉～

## 2021-04-28

好久没写我的生活日志了，有一点颓废，最近在备赛，还有不到十天就开始比了，开始学习渗透方面的知识，先从数据库方面入手吧，加油！！

## Mar 12 2021

想学的东西太多了, 一步一步来, **不要浮躁,** 先把当前该学的学了(比如网络, 和后端, 前端)

## Jan 29 2021

- Commons Logging+Log4j; SLF4j +logback
- 动态代理+注解
## Jan 28 2021

- (看不懂[NPE问题])[如果调用方一定要根据null判断，比如返回null表示文件不存在，那么考虑返回`Optional`](https://www.liaoxuefeng.com/wiki/1252599548343744/1337645544243233)：

    ```java
    public Optional<String> readFromFile(String file) {
    if (!fileExist(file)) {
    return Optional.empty();
    }
    }
    ```

    这样调用方必须通过`Optional.isPresent()`判断是否有结果

## Jan 11 2021

- 考过科二

## Dec 8 2020

- 动态路由(clock rate与dce,dte的关系, rip_v1和rip_v2关于summary的细节)

## Dec 3 2020

- 重温py准备写一个QQbot-COC插件
- 顺带爬pixiv

- 今天强迫症发作, 移除有关manu, manuev的所有信息, manu, manu2x, runtmanu, yangchaohe成为我的虚拟昵称(包括邮箱地址)

## Dec 2 2020

- 使用[graia-application-mirai](https://github.com/GraiaProject/Application)(基于[mirai-http-api](https://github.com/project-mirai/mirai-api-http)的python SDK)

    注意mirai-http-api支持的mirai版本, 目前使用mirai-console-1.0-M4.jar(后端),mirai-console-pure-1.0-M4.jar(前端),mirai-core-qqandroid-1.2.3.jar工作正常

## Dec 1 2020

- QQ机器人([mirai](https://github.com/mamoe/mirai))

## Nov 30 2020

- OD-软件断点和硬件断点
- 忽略异常
- ProtbaleExecutable
- OD-调用推栈

## Nov 26 2020

- 开始尝试破解增霸卡(失败)
- CM01
- 学习windows逆向
- 什么是字节序? why?[大端模式和小端模式](https://zhuanlan.zhihu.com/p/97821726)

## Nov 25 2020

- 修复picgo和笔记
- 学逆向
- windows异性框(XOR+黑白遮罩+OR+XOR)

## Nov 24 2020

- Perhaps one day, we'll all be computers.
- 理清C的typedef(封装)和#define(替换)的区别
- typedef的用法

## Nov 23 2020

- 学逆向中

## Nov 21 2020

- 通过修改android_winusb.inf, 添加c:\Documents and Settings\user\adb_usb.ini(content:0xVID)解决了adb驱动问题, 但是termux出现了无法授权的问题, 原因是手机无法授权两个adb客户端同时连接, 且手机重新安装了一遍adb才会出现RSA密钥授权框

## Nov 20 2020

- 纠结了大白菜的md5加密格式, 未果
- 手动给win7, win10装adb驱动, 未果(还是linux好用)

- startx是一个脚本, 提供给xinit参数的脚本

## Nov 19 2020

- 在b站上看到炬峰整蛊劝退学Linux(在桌面上弹出窗口), 我决定复习下X window
- LVM, RAID
- count+2

## Nov 18 2020

- wol(wake up on lan)
- ethtool
- English Grammer

## Nov 17 2020

- 深入archwiki配置了netctl-auto, 网卡别名(udev), 及一些iproute2, wireless指令

## Nov 16 2020

- 路由选择

    细节: 一般情况下, 优先选择最长的子网掩码的路由, 如果有多条路由, 则匹配管理距离, 管理距离小的路由优先, 如果管理距离相同, 再匹配度量值, 度量值小的优先, 如果度量值相同, 则选择负载均衡, 具体的方式看采用哪种路由协议和相关的配置

- English translate

## Nov 14 2020

- Android+Termux+adb实现手机上使用adb控制手机([跳转文章](../个人技术心得/Android/Termux+adb.md))
## Nov 13 2020

- 复习了iptables, route, arp等知识

## Nov 22 2020

- 摆弄了virtualbox并立下了学汇编的flag(为了逆向, 系统)
- 海岛升级16本

##
