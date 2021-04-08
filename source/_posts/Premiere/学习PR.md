---
title: 学习PR
date: 2020-10-22 12:00:00
author: manu
toc: true
categories: [adobe,pr]
tags: [剪辑]
---

记录学习pr的过程

<!-- more -->

## 录机与放机

录机: 源面板

放机: 目标面板

源面板和目标面板都可以进行选材, 可以选择插入和覆盖

> 拖动素材需要注意一点就是轨道的第一选项一定要选中, 不然不能拖进该轨道

![pr01](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@hexo/static/img/pr01.png)

拖入素材时视频和音频是链接着的，想分开可以右键取消链接

## 添加标记

添加标记方便寻找某些视频片段(在长视频里), 在窗口的标记菜单里可以为标记添加更多介绍.

![pr02](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@hexo/static/img/pr03.png)

> 也可以在时间轴里添加标记

## 速度

为视频增减速度的原理就是插帧和减帧，可通过以下操作调整

1. 时间轴面板选中素材右键-->速度/持续时间
2. 工具面板-->比率拉伸工具

在速度里支持倒放

## 序列

序列就是一个剪辑后的视频，可以将一个序列当成一个素材导入其他序列，可以导入细节，也可以整体导入

![pr04](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr04.png)

> 巧用序列嵌套: 需要做一个重复效果时, 比如无限旋转, 可以做一个旋转一圈的序列1, 然后将序列1*n复制得到序列2.
>
> 另一个例子就是画中画中画, 虽然效果有现成的(视频效果-->风格化-->复制)

## 效果控件

添加关键帧，制作动画，调整位置，添加转场...

![pr05](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr05.png)

添加的各种视频效果也是在这里调整

> 常用效果:
>
> - 边角定位
> - 风格化
> - 交叉溶解
> - 超级键（抠图用）
>
> 老电影特效:
>
> lumetri预设>黑白胶片, 颜色矫正>颜色平衡
>
> 阴影和中间调高光蓝色降低, 红色稍微提高

### 音量与亮度

![pr06](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr06.png)

Ctrl+鼠标点击音量/亮度控制线可以添加关键帧

音量可以由主声道来控制全局

### 调整速度/变速

可以为视频增减速度时添加一点效果

点击`fx`, 如图选中速度

![pr07](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr07.png)

然后在效果控件里添加关键帧, 可以将关键帧拉开让它有一个过渡效果

![image-20201024223851104](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr08.png)

此外还可以弄成下图这样..效果和上面区别还是有点的, 但我不知道怎么形容...

![pr09](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr09.png)

> 视频调整后, 原始音频跟不上可以使用ratio(R)工具进行拉伸

## 字幕

> pr2019cc和老版真的是变化太多--这是我在看老版视频对着2019cc疯狂找字幕选项的感慨

我把字幕分为title和subtitle

- title在工具面板里如图所示

![pr10](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr10.png)

​    字体的各种特效在效果面板里

- 此外还可以从菜单界面的`图形>新建图层>文本`进入

- subtitle可以使用新建字幕并设置如图以下选项

![pr11](https://cdn.jsdelivr.net/gh/yangchaohe/yangchaohe.github.io@static/img/img/pr11.png)

> <span style="color:red;">注意</span>: 一定要选择`开放式字幕`, 不然字幕不会显示, 这是我少看一个字后得到的教训
>
> 关于这些解释这些标准的文章[Premiere中的3种字幕制作工具](https://www.xinpianchang.com/e17602)

##  视频过渡

也叫转场, 就是从一个视频到另一个视频的效果.

常用的过渡效果有`3D运动, 溶解, 渐变擦除(可以自己用PS制作渐变效果)`

> 可以直接导入PS源文件进PR

 

 