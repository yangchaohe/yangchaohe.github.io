---
thumbnail: https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/mito/manjaro/manjaro_maia_abstract2.jpg
title: 备份Manjaro
date: 2020-5-23 12:00
author: manu
categories: [个人技术心得,Linux]
toc: true
tags:
  - KDE
  - 系统优化
  - 备份
---

在256G的平板电脑装双系统，使用因为第一次使用linux时觉得70G够用（源自于学习只装40G的自信），所以在电脑上的格局是win系统60G，win软件110G，linux根目录30G，/home30G.

<!-- more -->

没错，和我想的一样，在不打游戏的linux上个人做点小事确实是够用了，空间还很充足（余个10G左右），but，我发现了百度云命令行版，于是想把系统备份一下（作为一个过来人，备份很重要，要不是因为电脑空间小，才不会使用百度云）

为了备份/home25G，/usr15G这两个空间大户，使用了压缩效率非常棒的xz格式压缩，而且分开压缩，分开上传。

> xz压缩率是真的棒，就是花的时间有点久
>
> /home 25G --> 12G
>
> /usr 17G --> 4.45G

我删了很多大型IDE，如eclipse，IDEA，pycharm等等，使用软件管理器卸载，结果我发现了一点不对经。。。你猜怎么着，打不开应用列表、添加不了桌面配件等等有关桌面的问题产生了，虽然吧在linux上桌面没了也不要紧，还有命令行嘛，但是，没桌面怎么~~看小姐姐~~看视频学习，所以我去查看pacman日志到底是删了哪些重要的东西。

<img src="https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/Emoticons/emo5.jpg" style="zoom:50%;" />

看了半天，嗯～噢～，我发现我没看懂到底是哪个软件的问题，然后重启吧，发现网络也出问题了（大哭）。

我就这么废了半天去找是哪个软件的问题，最终我发现，还是重装吧，不过不是系统重装（作为一个垃圾程序员，不到万不得已是不会重装的），而是重新装一下桌面。

没网怎么装，USB连接手机就有了。

<img src="https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/Emoticons/emo2.jpeg" style="zoom:50%;" />

重新安装了`nerworkmanager`、`sddm-kcm`、`sddm`、`kde-applications`，并启动相关服务，重启，OK它回来了，因为配置什么的还在，所以也没损失什么。

<img src="https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/Emoticons/emo6.jpg" style="zoom:50%;" />

> **这次给我的教训就是，别乱卸文件，一两个到没啥，卸多的时候一定要慎重考虑，最好使用命令卸，如果你不知道软件管理是采用什么模式卸载**

<img src="https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/article/Emoticons/emo3.gif" style="zoom:50%;" />

今天差点想弄死自己，手贱。