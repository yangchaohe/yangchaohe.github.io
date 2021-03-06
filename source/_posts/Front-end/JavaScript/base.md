---
title: JavaScript基础
date: 2020-04-15
toc: true
author: manu
categories: [前端,JavaScript]
---

JavaScript（简称“JS”） 是一种具有[函数](https://baike.baidu.com/item/函数/301912)优先的[轻量级](https://baike.baidu.com/item/轻量级/22359343)，解释型或即时编译型的[编程语言](https://baike.baidu.com/item/编程语言/9845131)。虽然它是作为开发Web页面的[脚本语言](https://baike.baidu.com/item/脚本语言/1379708)而出名的，但是它也被用到了很多非浏览器环境中，JavaScript 基于原型[编程](https://baike.baidu.com/item/编程/139828)、多范式的动态脚本语言，并且支持[面向对象](https://baike.baidu.com/item/面向对象/2262089)、命令式和声明式（如[函数式编程](https://baike.baidu.com/item/函数式编程/4035031)）风格。 ——百度百科

<!-- more -->

### 示例代码

先展示一段js代码，从[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/A_first_splash)扒下来的，包含了最基本的用法

```js guessNumberGame.js &gt;folded
/**
 * 
 * 游戏逻辑：
    随机生成一个 100 以内的自然数。
    记录玩家当前的轮数。从 1 开始。
    为玩家提供一种猜测数字的方法。
    一旦有结果提交，先将其记录下来，以便用户可以看到他们先前的猜测。
    然后检查它是否正确。
    如果正确：
        显示祝贺消息。
        阻止玩家继续猜测（这会使游戏混乱）。
        显示控件允许玩家重新开始游戏。
    如果出错，并且玩家有剩余轮次：
        告诉玩家他们错了。
        允许他们输入另一个猜测。
        轮数加 1。
    如果出错，并且玩家没有剩余轮次：
        告诉玩家游戏结束。
        阻止玩家继续猜测（这会使游戏混乱）。
        显示控件允许玩家重新开始游戏。
    一旦游戏重启，确保游戏的逻辑和UI完全重置，然后返回步骤1。

 */

//  创建随机数
let randomNumber = Math.floor(Math.random()*100)+1;

// 记录猜过的数
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult')
// 告诉猜高还是低
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

function checkGuess(){
    let userGuess = Number(guessField.value);
    if(guessCount === 1){
        guesses.textContent = '上次猜的数:';
    }
    guesses.textContent += userGuess+' ';
    guesses.style.backgroundColor = 'yellow';

    if(userGuess === randomNumber){
        lastResult.textContent = '恭喜你！猜对了';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if(guessCount === 5){
        lastResult.textContent = 'Game over';
        setGameOver();
    } else {
        lastResult.textContent = '你猜错了！';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber) {
          lowOrHi.textContent = '你猜低了！';
          lowOrHi.style.backgroundColor = 'green';
        } else if(userGuess > randomNumber) {
          lowOrHi.textContent = '你猜高了';
          lowOrHi.style.backgroundColor = 'green';
        }       
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    // 创建button
    resetButton = document.createElement('button');
    resetButton.textContent = '开始新游戏';
    // 添加到Html底部
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click',resetGame);
}

function resetGame() {
    guessCount = 1;
    
    // 选中<div class='resultParas'></div>的所有p元素
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length; i++) {
      resetParas[i].textContent = '';
    }
//   取消重置按钮
    resetButton.parentNode.remove 
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
    lowOrHi.style.backgroundColor = 'white';
    guesses.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
guessSubmit.addEventListener('click',checkGuess);
```

html

```html test.html >folded
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class='resultParas'>
        <p class="guesses"></p>
        <p class="lastResult"></p>
        <p class="lowOrHi"></p>
        <label for="guessField">请猜数：</label>
        <input type="text" id="guessField" class="guessField">
        <input type="submit" value="确定" class="guessSubmit">
    </div>
</body>
<script src="./js/guessNumberGame.js"></script>
</html>
```

## 变量

### 定义

使用`let`来声明变量

```js
let age;
```

初始化

```js
age = 19;
```

声明+初始化

```js
let age = 19;
```

还有`var`也可以声明变量，他与`let`的区别如下

1.var的变量提升

```js
// true
name = 'manu';
var name;

//false
name = 'manu';
let name;
```

2.var的多次声明

```js
//true
var name = 'muyang';
var name = 'manu';

//false
let name = 'muyang';
let name = 'manu';

//true
let name = 'muyang';
name = 'manu';
```

### 命名规范

- 不能以下划线开头，它在js里由特殊意义
- 不能以数字开头
- 建议驼峰命名法
- 大小写敏感
- 不能与[关键字](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)重名

### 类型

#### Number

js给一个变量赋值数字不需要声明类型，和python类似

```js
let age = 19;
```

#### String

定义字符串，单双引号都可以

```js
let name = 'manu'
```

#### Boolean

```js
let iAmPeople = true;
let result = 1 > 3;
```

#### Array

和其他语言一样从0开始索引

```js
//定义
let array = [1,2,3,4];
let arrayString = ['a','b','c']

//访问
array[0];
arrayString[2];
```

#### Object

定义一个对象的多个属性

```js
 let ren = {name:'muyang',age:19};
 console.log(ren.age);
```

js是动态类型语言，不需要指定类型，使用引号就是字符串，数字就代表number，可以使用`typeof`返回传递变量的类型

```js
let name = 'shpherd'
typeof name;
```

## Map Set

ES6引入的，map就是键值对

```js
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
// 获取值
m.get('Michael'); // 95
// 添加键值对
m.set('new',17);
// 判断键是否存在
m.has('new');// true
// 删除键
m.delete('new');
```

set是key的集合，所以不能重复

```js
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```

## iterable

同样是ES6被引入，Map和Set、Array都是iterable类型的，可以通过for...of遍历

for...in 和 for...of 的区别就是使用数组时，因为数组也是对象，in会将特殊的属性边遍历出来，而of不会，of遍历map时会得到多个长度为2的数组

```js
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}/*["Michael", 95]
["Bob", 75]
["Tracy", 85]*/
```

实际上更常用的是使用内置方法forEach来遍历

```js
let a = [1,2,3,4]
a.forEach(function (v, k, arr) {
    // v: 指向当前元素的值
    // k: 指向当前索引
    // arr: 指向Array对象本身
    console.log(k + '= ' + v);
});
```

set的前两个参数一样，因为没有索引

map同上

## 运算符

### 算术

| 运算符 | 名称                 | 作用                                                         | 示例                                                |
| ------ | -------------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| `+`    | 加法                 | 两个数相加。                                                 | `6 + 9`                                             |
| `-`    | 减法                 | 从左边减去右边的数。                                         | `20 - 15`                                           |
| `*`    | 乘法                 | 两个数相乘。                                                 | `3 * 7`                                             |
| `/`    | 除法                 | 用右边的数除左边的数                                         | `10 / 5`                                            |
| `%`    | 求余(有时候也叫取模) | 在你将左边的数分成同右边数字相同的若干整数部分后，返回剩下的余数 | `8 % 3` (返回 2，8除以3的倍数，余下2 。)            |
| `**`   | 幂                   | 取底数的指数次方，即指数所指定的底数相乘。它在EcmaScript 2016 中首次引入。 | `5 ** 5` (返回 3125，相当于 `5 * 5 * 5 * 5 * 5` 。) |

### 赋值

| 运算符 | 名称     | 作用                                           | 示例                 | 等价于                  |
| ------ | -------- | ---------------------------------------------- | -------------------- | ----------------------- |
| `+=`   | 加法赋值 | 右边的数值加上左边的变量，然后再返回新的变量。 | `x = 3;    x += 4;`  | `x = 3;    x = x + 4;`  |
| `-=`   | 减法赋值 | 左边的变量减去右边的数值，然后再返回新的变量。 | `x = 6;    x -= 3;`  | `x = 6;    x = x - 3;`  |
| `*=`   | 乘法赋值 | 左边的变量乘以右边的数值，然后再返回新的变量。 | `x = 2;    x *= 3;`  | `x = 2;    x = x * 3;`  |
| `/=`   | 除法赋值 | 左边的变量除以右边的数值，然后再返回新的变量。 | `x = 10;    x /= 5;` | `x = 10;    x = x / 5;` |

### 比较

| 运算符 | 名称       | 作用                           | 示例          |
| ------ | ---------- | ------------------------------ | ------------- |
| `===`  | 严格等于   | 测试左右值是否相同             | `5 === 2 + 4` |
| `!==`  | 严格不等于 | 测试左右值是否**不**相同       | `5 !== 2 + 3` |
| `<`    | 小于       | 测试左值是否小于右值。         | `10 < 6`      |
| `>`    | 大于       | 测试左值是否大于右值           | `10 > 20`     |
| `<=`   | 小于或等于 | 测试左值是否小于或等于右值。   | `3 <= 2`      |
| `>=`   | 大于或等于 | 测试左值是否大于或等于正确值。 | `5 >= 4`      |

> `==`与`===`的区别：`==`可以比较类型不同的值（结果难以预料）

### 示例

```html test.html &gt;folded
<button class='sw'>true</button>
<p>The button is true</p>
<script src ='./js/switcher.js'></script>
```

```js switcher.js &gt;folded
const btn = document.querySelector('.sw');
const txt = document.querySelector('.sw + p');
btn.addEventListener('click',switcher);

function switcher(){
    if (btn.textContent === 'true'){
        btn.textContent = 'off';
        txt.textContent ='The button is off';
    } else {
        btn.textContent = 'true';
        txt.textContent = 'The button is true';
    }
}
```

##  字符串

普普通通的字符串

```js
let a = 'What is up?';
let b = "I'am fine";
let c = 'I\' am fine';
```

### 连接字符串

使用`+`将字符串连起来

```js
let a = 'hello ';
let b = 'world';
let c = a +b;
let d = c + 'where are you?'
```


### 数字与字符

1.连接字符串和数字时，会自动把数字变成字符串

```js
let a = 19;
let b = test;
let c = a+b;
```

2.数字-->字符串

```js
let a = 23;
let b = a.toString();
```

3.字符串-->数字

```js
let a = '23';
let b = Number(a);
```

### 处理字符串

建议在处理字符串时，先考虑官方提供的方法

1.获取长度`length`

```js
let name = 'manu';
name.length;
```

2.获取特定字符

```js
//第一个字符
name[0];
//最后一个字符
name[name.length-1];
```

3.获取子字符串位置

```js
name.indexOf('herd');
```

返回4，若找不到，则返回-1

4.获取规定位置的字符串

```js
//得到索引1到最后的字符串
name.slice(1);
//3-5的字符串
name.slice(3,5);
//从索引2开始截取3字符
name.substr(2,3);
```

5.大小写转换

```js
name.toLowerCase();
name.toUpperCase();
```

6.替换

replace需要两个参数，一是需要替换的字符，而是替换后的字符

```js
name.replace('she','test');
```

注意，不改变原name的值，他只是返回一个新的值

## 数组

数组可以存储任意类型，包括数组

```js
//创建
let arr = [1,'hello',3,5,[1,2,3]];
//访问
arr[0];
//修改
arr[0] = 'test';
```

### 处理数组

1.获取长度

```js
arr.length;
```

2.遍历数组

```js
for(let i=0; i<arr.length; i++){
	console.log(arr[i]);
}
```

3.字符串与数组的转换

字符串-->数组

```js
let str = '1,2,3,4,5,6,7,8,9';
//使用逗号分离每个元素
let arr = numStr.split(',');
//["1", "2", "3", "4", "5", "6", "7", "8", "9"]
```

数组-->字符串

```js
let newStr = arr.join('-');
//"1-2-3-4-5-6-7-8-9"
//或者
let newStr2 = arr.toString();
//"1,2,3,4,5,6,7,8,9"
//toString的局限就是不能控制分隔符
```

### 添加与删除元素

1.在末尾添加

```js
arr.push(4);
//会返回新数组长度，可以添加多个元素，如
arr.push(4,5,6,7);
```

2.删除末尾

```js
arr.pop();
//返回删除的值
```

3.在开头添加

```js
arr.unshift('test');
//返回新数组长度
```

4.删除开头

```js
arr.shift();
//返回删除的值
```

## 流程控制

### if语句

```js
if(boolean){
	//run code
} else {
    //run code
}
```

if分支

```js
if(boolean){

} else if {

} else if {

} else{

}
```

### switch语句

switch可以写的if也可以写，switch相对比较简洁，但if可以写的switch不一定可以写（有范围时）

```js
let a = 2;
switch(a){
	case 0: console.log(0);break;
	case 2: console.log(2);break;
}	
```

### for循环

```js
for(let i=0;i<10;i++){
	//循环体
}
```

### for...in

```js
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    console.log(key); // 'name', 'age', 'city'
} 
var a = ['A', 'B', 'C'];
for (var i in a) {
    // 遍历的是属性
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}
```

### while循环

```js
while(boolean){
	//循环体
}
```


## 解构赋值

同时对一组变量进行赋值

```js
var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
//嵌套赋值
let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];
```

从一个对象获取属性

```js
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
// 因为对象不是iterable类型的，所以不能用[]
var {name,age,gender} = person;
```

对象的对象

```js
var animal = {
	age : 2,
	name : 'haho',
	gender : 'male',
	son :{
    	info: 'foo',
    	other: 'bar',
	}
};
//注意层次
var {age, name, son:{info, other}} = animal;
```

重命名

```js
let {age:ag, name:na, son:{info:inf, other:ot}} = animal;
```

为了防止没有找到属性而出现undefined，可以设置一个默认值

```js
let {age,flag = false} = animal;
```

### 场景

快速交换值

```js
let a = 1, b=2;
[a,b] = [b,a];
```

将对象作为参数传入函数，可选择性传递参数

```js
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
//使用
buildDate({ year: 2017, month: 1, day: 1 });
// Sun Jan 01 2017 00:00:00 GMT+0800 (CST)
```

## JS对象类型的坑

这是[廖雪峰老师](https://www.liaoxuefeng.com/wiki/1022910821149312/1023021722631296)总结的，抄在这里方便自己以后碰到这些问题而找不到头脑

- 不要使用`new Number()`、`new Boolean()`、`new String()`创建包装对象；
- 用`parseInt()`或`parseFloat()`来转换任意类型到`number`；
- 用`String()`来转换任意类型到`string`，或者直接调用某个对象的`toString()`方法；
- 通常不必把任意类型转换为`boolean`再判断，因为可以直接写`if (myVar) {...}`；
- `typeof`操作符可以判断出`number`、`boolean`、`string`、`function`和`undefined`；
- 判断`Array`要使用`Array.isArray(arr)`；
- 判断`null`请使用`myVar === null`；
- 判断某个全局变量是否存在用`typeof window.myVar === 'undefined'`；
- 函数内部判断某个变量是否存在用`typeof myVar === 'undefined'`。

- 数字的`toString()`方法需要特殊使用
  - 123..toString()
  - (123).toString()

> [Number调用toString()方法产生的问题](http://www.fedlab.tech/archives/888.html)