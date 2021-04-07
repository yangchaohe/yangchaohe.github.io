![内存分布](C:\Users\Yang Yong\Desktop\内存分布.bmp)

磁盘最初的512字节是启动区，要装载512字的内容

1. #### 一些BIOS指令：

- **JC**，jump if carry，意思是：进位标志是1的话就会跳转
- **INT 0x13**，调用BIOS的13号函数
  - **AH=0x12**；（读盘）
  - **AH=0x13**；（写盘）
  - **AH=0x14**；（校验）
  - **AH=0x0c**；（寻道）
  - **AL=处理对象的扇区数**；（只能同时处理连续的扇区）
  - **CH=柱面号 &0xff**
  - **CL=扇区号（0-5位）|（柱面号 &0x300）>>2**
  - **DH=磁头号**
  - **DL=驱动器号**
  - **ES:BS=缓冲地址**；（校验和寻道时不使用）
  - 返回值
    - **FLACS.CF==0**：没有错误，AH==0
    - **FLACS.CF==0**：错误，错误号码存到AH内
      - flag代表进位标志

#### 缓冲区地址：

- 因为16为寄存器BX只能表示0-65535个地址，每个地址1byte，也才64K
  -  一个内存地址可以存多少个8个Bit的byte与CPU有关，对于8位机而言，只能存1个，对于32位机来说，可以存4个。
- 于是，增加了一个EBX，可以处理4GB 

- 在早些年代，使用了一个起辅助作用的段寄存器
  - ES:BX表示地址，可以写成**MOV AL,[ES:BX]**
    - 代表了ESx16+BX的地址，此时可以指定0xffff*0xffff的内存地址（1M）



事实上，不管我们要指定内存的什么地址，都要指定段寄存器，不写的话默认是DS：

MOV CX，[1234]==MOV CX，[DS:1234]



#### 试错：

- 防止有时候不能读取数据
- 指令
  - **JNC**，jump if not carry，进位标志是0时跳转
  - **JAE**，jump if above equal，大于等于跳转
  - AH=0x00,DL=0x00,INT=0x13
    - 系统复位
  - **JBE**，jump if below or equal



#### 连续读扇区，柱面

emmm等我用到再写

**JB**，jump if below

**EQU**,声明常数

- ​	CYLS EQU 10，表示CYLS=10（cylinders）



haribote.nas

- ```
  fin:
  		HLT
  		JMP		fin
  ```

  利用nask编译器，发现文件名写在0x002600以后，内容在0x004200后面，所以只要在启动区执行内容的文件就行了==

- 在haribote.nas**加上ORG 0xc200**，在ipl.nas处理的最后加上**JMP 0xc200**就行了（0x8000+0x4200）



#### 画面

```assembly
ORG		0xc200

		MOV		AL,0x13		;VGA显卡，320x200x8位彩色
		MOV		AH,0x00
		INT		0x10
  fin:
  		HLT
  		JMP		fin
```

- 设定AH=0x00后，可以调用显卡函数，可以切换显示模式
  - AH=0x00
  - AL=模式：
    - 0x13:16色字符模式，80x25
    - 0x12：VGA图形模式，640x480x4位彩色模式，独特的4面存储模式
    - 0x13：VGA图形模式，320x200x8位彩色，调色板模式
    - 0x6a：扩展VGA图形模式，800x600x4位彩色模式，独特的4面存储模式
  - 返回值：无



还有一段前期准备和画面信息保留，不好写，再说



#### 导入C语言：

为了调用C语言，作者改了nas的内容，原因暂未说

bootpack.c

1. ```c
   void HariMain(void)
   {
       fin:
      		/*想加HLT*/
       	goto fin;
   }
   ```

2. goto会被编译成JMP

3. HariMain不能改（?）

4. 作者把C源码编译成了horibote.sys

5. 我认为编译器会把.sys编译到img里（0x4200）

**实现HLT**

naskfunc.nas

```
[FORMAT "WCOFF"]		 ;制作目标文件格式（说为了与c编译的中间文件.obj链接）
[BITS 32]				;32位模式机械语言
；制作目标文件信息
[FILE "naskfunc.nas"]	 ;源文件名信息
	GLOBAL _io_hlt		;程序包含的函数（_为了与c链接）
；实际函数
[SECTION .text]			;写这个才能写程序
_io_hlt:	;void io_hlt(void);
	HLT
	RET					；表示return
```

bootpack.c

```c
void io_hlt(void);

void HariMain(void)
{
    fin:
    io_hlt();
    goto fin;
}
```

Makefile也改了下，~~我认为，naskfunc.nas的编译文件在bootpack.c后面~~

作者说这两个组成haribote.sys，前半部分是汇编，后面是c

然后使用作者修改的asmhead.nas(haribote.nas)进行调用c

