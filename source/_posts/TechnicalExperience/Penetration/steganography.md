---
title: 隐写秘籍
toc: true
recommend: 1
uniqueId: '2021-06-03 14:49:28/隐写秘籍.html'
mathJax: false
date: 2021-06-03 22:49:28
thumbnail:
tags:
categories: [个人技术心得,渗透]
keywords:
---
> 隐写术是将秘密数据隐藏在普通的、非秘密的文件或消息中以避免被发现的技术；然后再目的地提取秘密数据。隐写术的使用可以与加密相结合，作为隐藏或保护数据的额外步骤。隐写术这个词来源于希腊词steganos（意思是隐藏或覆盖）和希腊词graph（意思是写）。

<!-- more -->

隐写术虽然是在CTF中听到的名字，但实际上已经不是第一次用了，曾经逛迹于各大论坛用过几次图种😅，表面是图，改成rar后缀解压就是torrent😆，emm其实我也只是听说而已.....ok，现在来了解一些常见的隐写方法，我将会以如何隐藏，如何解开为思路进行学习

# 图片中的秘密

所需知识：

- 基本图片格式(bmp，jpg/jfif，png，gif...)的文件格式

工具：

- cat
- vim
- hexdump
- binwalk
- ...

## 将数据插入图片末尾

**jpg/jfif** 只会识别到结束标识**FFD9**，**png** 则是**49 45 4e 44 ae 42  60 82 **

利用该原理，可以将各种数据插入图片末尾，常见的有

- jpg/png+text
- jpg/png+rar(rar不规定开头标识，通过更改后缀可直接在两个文件进行转换)
- 等等

### 字符隐写

制作：

```bash
echo 'text' > test.jpg
## 或者使用vim编辑二进制
vim -b file.name
# 指令ga可查看当前字符信息
# 指令:%!xxd进入16进制编辑模式(%表示所有行)
# 修改16进制后使用:%!xxd -r返回成二进制
```

查看方法：使用能解析二进制的工具即可

### 文件隐写

制作：

```shell
cat test.png file > test.png
```

解析：binwalk能解析这类特殊文件里的特殊标识，`-e`选项就能分离这些文件

## LSB隐写

最低有效位隐写，更改图片某个像素点的最低位为隐藏的消息位，可实现字符串隐写和小图隐写。因为是更改了图片的像素点，所以采用有损压缩的图片格式就会丢失隐写的信息(比如jpg..)

小图隐写的解析方式需要使用Stegsolve工具对每个通道值的8个plane值进行二值化

字符隐写需要使用编程语言或工具将每个图片的最低位收集起来转换成ASCII码

> P.S.：目前没有找到很好的进行LSB写入的工具，只能使用编程语言代替下了，[python](https://blog.csdn.net/weixin_26737625/article/details/108515493)

## EXIF隐写

exif可以记录数码照片的属性信息和拍摄数据，在linux端使用**exiftool**查看和编辑

## GIF文件

gif支持多帧动画，可以将数据隐写在一个极短的帧里面

> Stegsolve支持将gif解帧（Analyse－Frame Brower）
>
> P.S.：有一些题会将GIF头给删除，需要自己加上...最新的标准是89a，头为`GIF89a`

## 图片宽高

修改png图片IHDR头中的高宽可以隐藏图片的一部分，IHDR后面的第一个字节是宽，第二个字节是高，后面还有crc校验码

利用crc校验码可以破解该图的原始宽高，例如下面一个python代码就是根据crc暴力破解原始宽高

```python
# 代码来源https://www.jianshu.com/p/0b5d14657d2e
import zlib
import struct
#读文件
file = '2.png' 
fr = open(file,'rb').read()
data = bytearray(fr[12:29])
crc32key = eval(str(fr[29:33]).replace('\\x','').replace("b'",'0x').replace("'",''))
print(crc32key)
n = 4095 #理论上0xffffffff,但考虑到屏幕实际，0x0fff就差不多了
for w in range(n):#高和宽一起爆破
    width = bytearray(struct.pack('>i', w))#q为8字节，i为4字节，h为2字节
    for h in range(n):
        height = bytearray(struct.pack('>i', h))
        for x in range(4):
            data[x+4] = width[x]
            data[x+8] = height[x]
            #print(data)
        crc32result = zlib.crc32(data)
        if crc32result == crc32key:
            print(width,height)
            #写文件
            newpic = bytearray(fr)
            for x in range(4):
                newpic[x+16] = width[x]
                newpic[x+20] = height[x]
            fw = open(file+'.png','wb')#保存副本
            fw.write(newpic)
            fw.close
```

> P.S.：linux修改后无法读取图片(校验码不对)，虽然修改校验码可以显示，但这张图片的破解难度估计就有点大（靠猜？）；windows可以显示修改后的图片