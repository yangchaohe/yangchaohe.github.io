---
title: 自制OS01-汇编
date: 2019-11-4 19:37:26
author: manu
toc: true
categories: [操作系统,自制OS]
tags:
  - 汇编
  - NASK
  - 寄存器
---

 写系统不会汇编怎么行

<!-- more -->

## 汇编基础

电脑里所有的东西都是二进制码

- 十六进制一位表示二进制四位
- 1byte = 8bit
- `;`代表注释
- 源程序都是由十六进制完成的，十六进制前面要加0x，不然就是十进制
- 因为二进制就算转换位十六进制也还是太长了，所以在汇编程序里使用

### 指令

`DB`(define byte，大小写无所谓)指令：写入1字节，此外，DB可以直接写字符串

- `DB"hello world"`

  汇编语言会自己查找字符对应的编码，然后排列

`ARESB`(reserve byte)指令：空出字节
`DW`(define word)：word代表16位，也就是2字节
`DD`(define double word) : four bytes
`$`计算前面有多少字节（不只这一个含义）

`ORG`(origin，起源)：告诉nask，开始执行的时候，将机器语言指令装载到内存中的哪个地址。

*　 加入这条指令后，`$`的意思是将要读入的内存地址。

`JMP`(jump)：跳转，与entry结合使用

`entry`(入口)：标签说明，用于指定JMP指令的跳转目的地等

`MOV`(move)：赋值
例如`MOV SS,AX`，AX并没有变“空”，而是保持原有值不变

### **IPL**

**boot sector**也叫**IPL**(initial program loader，启动程序加载器)：计算机是以512字节为一个单位读取的，而第一个单位就是boot sector，计算机会检查boot sector的最后两个字节，是`0x55AA`计算机才会认为有启动程序（就是这样设计的）

## 寄存器

代表性的寄存器有下面8个：

**AX**-----accumulator，累加寄存器

**CX**-----counter，计数寄存器

**DX**-----data，数据寄存器

**BX**-----base，基址寄存器

**SP**-----stack pointer，栈指针寄存器

**BP**-----base pointer， 基指针寄存器

**SI**------sourse index，源变址寄存器

**DI**------destination index， 目的变址寄存器

- 上面都是十六位的寄存器，可以存储16位的二进制数

- X表示extend（扩展的意思）

- 这些寄存器加起来有十六个字节

- 32位的前面加E

CPU中另外8个寄存器：

**AL**-----accumulator low,累加寄存器低位

**CL**-----counter low,计数寄存器低位

**DL**-----data low,数据寄存器低位

**BL**-----base low,基址寄存器低位

**AH**-----accumulator high,累加寄存器高位

**CH**-----counter high,计数寄存器高位

**DH**-----data high,数据寄存器高位

**BH**----base high,基址寄存器高位

- AX寄存器有16位。0-7位是AL，8-15是AH，其他同理

- CPU依旧是那个CPU

### 段寄存器

**ES**----extra segment,附加段寄存器

**CS**----code,代码段寄存器

**SS**----stack，栈段寄存器

**DS**----data，数据段寄存器

**FS**----

**GS**----

一些语句：

`MOV SI,msg`

意思是**SI = msg**，把标号赋给了地址

注意，这里书上**msg==0x7c74**

`JMP entry`==`JMP 0x7c50`

每个标号对应一段地址，因为此时entry==0x7c50，注意entry可以自定义

`MOV BYTE[678],123`

表示用内存的`678`号地址来存`123`这个数值，`BYTE`表示8个存储单元响应，WORD表示16个单元

> 内存的低位在上面，高位在下面
>

内存地址指定还可以用寄存器，`BYTE[SI]`

MOVE的原数据和目的数据必须位数相同，也就是说AL可以省略BYTE

- `MOV AL,[SI]`

### 指令

- `ADD`加法指令

  `ADD SI，1`

  表示SI=SI+1

- `CMP`比较指令

  `CMP a,3`	

  先比较a与3，再做什么

- `JE`条件跳转语句之一（jump if equal）

  可以根据CMP的比较结果来执行下一条指令
- `INT`(interrup)中断指令和`BIOS`(basic input output system)

- HLT（halt）

  可以让CPU进入待机状态，并不是完全停止

### 内存

- 内存是外部存储器

- CPU要通过管脚向内存发送电信号，严格来说。CPU和内存之间存在芯片（chipset）的控制单元

- CPU访问内存的速度比访问寄存器要慢很多倍

- `0x00007c00`是启动区装载内容地址
