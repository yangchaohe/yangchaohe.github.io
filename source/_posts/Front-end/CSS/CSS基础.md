---
title: CSS基础
toc: true
recommend: 1
keywords: categories-java
uniqueId: '2020-04-08 01:17:34/CSS基础.html'
mathJax: false
date: 2020-04-08 09:17:34
thumbnail:
tags: 
categories: [前端,CSS]
---

> ### 简介
>
> 层叠样式表`Cascading style sheets`
>
> - 可以用来给网页创建样式表，对网页进行修饰
>
> - 层叠就是多层结构，高的可以覆盖低的
>
> - css可以为网页每个层次设置样式

<!-- more -->

例子

- 内联样式

```html
<p style="color:red;font-size:100px;">这是一段内容</p>
```

	在元素的的style属性中编写样式
	
	缺点：相当于表现与**结构耦合**，不易**复用**，不推荐使用

- 内部样式

  通过CSS选择器选中指定样式

```html
<head>
    <style type="type/css">
    	p{
    		color:red;
    		font-size:100px;
    	}
    </style>
</head>
```

	但还是有缺点，那就是只在一个页面起作用

- 外部样式表

  title进一步复用，利用link链接多个网页，方便管理

  使用步骤：

  1.创建`.css`文件，内容如下

```css
p{
    color:red;
    font-size:100px;
}
```

			2.在需要样式的网页头部，引入`.css`文件

```html
<head>
    <link rel="stylesheet" type="text/css" href=".css文件路径"/>
</head>
```

	优点：提高网页访问效率（在缓存里访问同一个css文件），完全使结构和表现分离，最大程度进行复用，用我的话讲就是方便维护，减少代码冗余

### 语法

- 选择器(选择指定元素)+声明块(修饰指定元素)
  - `h1{color:red;}`

- 用`/*我的注释内容*/`注释

### 常用选择器

#### 1.id选择器

通过元素的id属性可以选中**唯一**的一个元素

- 语法

```css
#id{}
```

- 注意
  - id不能重复

#### 2.类选择器

通过class属性选中**一组**元素

- 语法

```css
.class{}
```

并且可以用空格设置多个属性值

```html
<p class="tag1 tag2">
    
</p>
```

#### 3.并集选择器

将选择器分组

- 语法

```css
.class1,#id1,p{}
```

满足一个条件即可

#### 4.通配选择器

选择所有元素

```css
*{}
```

#### 5.交集选择器

- 满足所有条件才行
- id一般不用这个，因为id可以确定唯一元素

- 语法

```css
p.class1.clss2{}
```

### 元素之间的关系

- 父元素：直接包含子元素的元素

- 子元素：直接被父元素包含的元素

- 祖先元素：直接或间接包含后代元素的元素

- 后代元素：直接或间接被祖先元素包含的元素

#### 后代选择器

- 选中指定指定元素的后代元素，范围大

- 语法

```css
#id1 span{}
.class1 span span{}
```

#### 子代选择器

- 选中指定父元素的子元素

- 语法

```css
div > span{}
```

- 兼容性
  - IE6不支持  

#### 兄弟选择器

- 选中指定元素的后面元素

- 语法

```css
/*指定选中紧挨的一个元素*/
div + p{}
/*选中div后面所有的p元素*/
div ~ p{}
```

### 其他的选择器 

伪类选择器

代表访问的状态

- 未访问的链接

```css
a:link{}
```

- 访问过的链接

```css
a:visited{}
/*因为隐私原因，只可设置color*/
```

- 鼠标滑过链接

```css
a:hover{}
```

- 鼠标点击链接

```css
a:active{}
```

> `link visited hover active`最好按照顺序写，不然会有的属性冲突不会生效（它们的优先级是一样的 ）

- 有两个伪类适用于其他标签

```css
:hover
:active
```

> :warning: IE6不兼容

- 文本框获取焦点时的状态

```css
input:focus{}
```

- 选中时的状态，适用于大多浏览器

```css
::selection{}
```

- 火狐要用

```css
::-moz-selection
```

#### 伪元素选择器

伪元素一般指一些特殊位置

CSS3 引入 `::before` 是为了将[伪类](https://developer.mozilla.org/en-US/docs/CSS/Pseudo-classes)和[伪元素](https://developer.mozilla.org/en-US/docs/CSS/Pseudo-elements)区别开来。浏览器也接受由CSS 2 引入的` :before` 写法。

```css
:first-letter/*目前发现a,span不能用*/
:first-line/*目前发现a,span不能用*/
:before{
    content:"在元素最前面";
}/*用content添加内容*/
:after{
	content:"在元素最后面";
}/*用content添加内容*/
```

- ie6不支持

#### 属性选择器

每个标签都可以有`title=" "`这个属性

- 列举一些常用的

`标签名[属性名]{}`

`标签名[属性名=属性值]{}`

`标签名[属性名^=某字符]`

- 选择字符开头的属性的标签

`标签名[属性名$=某字符]`

- 选择字符结尾的属性的标签

`标签名[属性名*=某字符]`

- 选择含有字符的属性的标签

#### 子元素选择器

- 选择第一个子元素

```css
tag:first-child{}
```

	选中所有元素里面的第一个tag元素
	
	若该子元素不是第一个，则不选中

```css
tag:last-child{}
```

```css
tag:nth-child(x){}
```

	选中所有父元素的x个tag
	
	当x=even时 选择偶数
	
	x=odd 奇数
	
	实例:表格

- 在元素中选择

```css
tag:first-of-type{}
```

	在tag中选择第一个，不管谁是tag的父元素

```css
e:last-of-tyoe{}
e:nth-of-type(x){}
```

#### 否定选择器

```css
:not(选择器){}
```

> [练习选择器的一个网站](http://flukeout.github.io/)

### 样式的继承

- 父元素的一些样式会继承给子代
- 背景样式，边框，定位样式都不会变
- 是否可以继承可以参考w3cschool网站

### 选择器的优先级

当选择器选中相同的元素时，优先级高的生效

- 内联样式1000

- id选择器100

- 类和伪类10

- 元素选择器

- 通配*0

- 继承，没有优先级

> 有多种选择器时，相加比较，但不会超过**最大数量级**
>
> 优先级一样时，用后面的（覆盖）
>
> 并集选择器不会相加，单独计算
>
> 在样式后面添加`!important`，优先级最大，开发时建议尽量不用
>
> ```css
> p{
>  color:yellow !important;
> }
> ```

### 长度单位

- `px`
  - 相当于屏幕的像素点
  - 屏幕好，像素点小（像素多）

- `%`
  - 可以根据父元素的大小设置子元素的大小，适用于自适应界面

- `em`
  - `1em=1font-size`
  - em可以根据当前字体大小设置长度

- `rem`
  - 相对与根元素字体大小设置

### 颜色单位

#### RGB

红(red)绿(green)蓝(blue)三原色

两种表示方法

- `rgb(0-255,0-255,0-255)`

- `rgb(0-100%,0-100%,0-100%)`

用十六进制表示0-255

`#+00-ff（red）+00-ff(green)+00-ff(blue)`

当有两两重复时可以简写

`#ff0000,#f00`

#### RGBA

- 需要四个值，前三个和RGB一样，第四个代表透明度(`0`,`.5`,`1`)
  - `rgb(0,0,0,.54)`

#### HSL和HSLA

- H(hue)：色相（0-360）
- S(saturation)：饱和度，颜色浓度（0-100%）
- L(lightness)：亮度，颜色亮度（0-100%）
- A代表透明度
  - `hsl(100,100%,0.543)`

### 字体

- 颜色`color`

- 字体大小`font-size`（默认16px）

  实际设置的是字体所在的"格"

- 字体用`font-family`修改，可使用多种字体用`,`隔开，优先最前面的

- `font-style`设置字体风格

  italic，oblique，normal

- `font-weight`设置字体粗细

  normal，bold，bolder，lighter，100-900

- `font-variant`小型字母大写

  normal

  small-caps（大写字母缩小）

- 快速设置字体的多种样式，简写

```css
p{
 	font:italic bold 20px "字体";   
}
```

		**文字的大小和字体必须写，并且大小和字体必须最后按顺序写**
	
		**优点**：加载性能好

- 字体分类

  **serif**
  **sans-serif**
  **monospace**
  **cursive**
  **fantasy**

  一般作为最后一个字体

- 从服务器里加载字体

```css
@font-face{
    /* 指定字体名 */
	font-family:"fontName";
    /* 路径 */
	src: url("./font/font.ttf")，
        url();
}
```

以后可以直接使用fontName字体

缺点：加载速度，**版权**

### [new]图标字体（iconfont）

> 【百度百科】矢量图是根据几何特性来绘制图形，[矢量](https://baike.baidu.com/item/矢量/12795520)可以是一个点或一条线，矢量图只能靠[软件](https://baike.baidu.com/item/软件/12053)生成，文件占用内在空间较小，因为这种类型的图像文件包含独立的分离图像，可以自由无限制的重新组合。它的特点是放大后图像不会失真，和[分辨率](https://baike.baidu.com/item/分辨率/213523)无关，适用于图形设计、文字设计和一些标志设计、版式设计等

- 网页一些小的图标如果使用图片的话比较麻烦，而且图片比较大，不灵活
- 而字体是矢量图，不会失真，于是可以把这些图标做成矢量图
- 使用引入字体的形式来使用这些图标

*fontawesome使用步骤*

1. [官网下载](https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself)，大陆可能比较慢，找梯子爬吧
2. 解压
3. 将css和webfonts**放在一起**移动到项目
4. 将all.css引入网页
5. 查api文档使用图标
6. fab和fas免费

举几个例子

```html
<!--head-->
<link rel="stylesheet" href="./fontawesome/css/all.css">
<!-- body -->
<div style="font-size: 2rem;">
    <div><i class="fas fa-home fa-fw" style="background:MistyRose"></i> Home</div>
    <div><i class="fas fa-info fa-fw" style="background:MistyRose"></i> Info</div>
    <div><i class="fas fa-book fa-fw" style="background:MistyRose"></i> Library</div>
    <div><i class="fas fa-pencil-alt fa-fw" style="background:MistyRose"></i> Applications</div>
    <div><i class="fas fa-cog fa-fw" style="background:MistyRose"></i> Settings</div>
</div>
```

其他用法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        li::before{
            /* 图标编码 */
            content: "\f1b0";
            /* 使用编码的其他设置，在.css文件里面找使用的字体族，其他属性也要写上才会生效 */
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
        }
    </style>
    <link rel="stylesheet" href="./fontawesome/css/all.css">
</head>
<body>
    <ul>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
    </ul>
    <!-- 通过实体来使用图标 ，class这个类引入字体族及特殊属性，后面的&#x;代表十六进制编码，可以去api文档查询-->
    <span class="fas">&#xf1b0;</span>
</body>
</html>
```

[阿里的图标库](https://www.iconfont.cn)

***注意版权，以免不必要的纠纷***

###   行高（行间距）

```css
line-height:40px;
```

- line-height设置行高

  1相当与100%

- 文字默认在行高中垂直居中显示

`行间距=行高－字体大小`

- 行高也可以在`font`中设置


```css
/* 字体大小/行高 */
font: 16px/30px "字体";
```

> 单行字体想在**父元素中居中**显示时只需将字体的行高设置与父元素一致
>
> 设置样式时注意覆盖问题

### 文本样式

`text-tansform`

- none默认
- captalize单词首字母大写
- uppercase都大写
- lowercase都小写

`text-decoration`修饰

- none

- underline下划线

- overline上划线

- line-through删除线

> 超链接默认text-decoration默认是underline

`letter-spacing`修改字符间距

`word-spacing`单词间距(中文没多大用)

`text-align`设置对齐方式

- left靠 左，默认

- right靠右

- center居中

- justify两端对齐

`text-indent`设置首行缩进

```css
text-indent:2em;
```

- 正值向右
- 负值向左

## IDE-Hbuildx

| 常用快捷键        | 意义         |
| ----------------- | ------------ |
| `ctrl+insert`     | 快速复制行   |
| `alt+/`           | 代码提示     |
| `ctrl+k`          | 格式化文本   |
| p.class1+`tab`    | 快速创建元素 |
| ！+`tab`          | 得到整体框架 |
| ctrl+]            | 包围tag      |
| ctrl+shift+k      | 反格式化     |
| p.class1$*8+`tab` |              |
|                   |              |

## IDE-VScode

里面的插件很好用