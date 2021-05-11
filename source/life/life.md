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