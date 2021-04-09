---
title: PHP基础学习笔记
date: 2021-3.9 15:00
author: manu
toc: true
categories: [编程语言,PHP]
tags: PHP
---

> **PHP**（全称：**P**HP：**H**ypertext **P**reprocessor，即“PHP：超文本预处理器”）是一种[开源](https://zh.wikipedia.org/wiki/开源)的通用[计算机](https://zh.wikipedia.org/wiki/计算机)[脚本语言](https://zh.wikipedia.org/wiki/脚本语言)，尤其适用于[网络开发](https://zh.wikipedia.org/wiki/网络开发)并可嵌入[HTML](https://zh.wikipedia.org/wiki/HTML)中使用

<!-- more -->

## PHP的超全局变量

- [$_SERVER](https://www.php.net/manual/zh/reserved.variables.server.php)是PHP里面的超全局变量, 包含了web服务器提供的所有信息.可通过`phpinfo()`查看
  - `$_SERVER['PHP_SELF']`得到自身文件名
- [$GLOBALS](https://www.php.net/manual/zh/reserved.variables.globals.php)
- [$_GET](https://www.php.net/manual/zh/reserved.variables.get.php)
- [$_POST](https://www.php.net/manual/zh/reserved.variables.post.php)
- [$_FILES](https://www.php.net/manual/zh/reserved.variables.files.php)
- [$_COOKIE](https://www.php.net/manual/zh/reserved.variables.cookies.php)
- [$_SESSION](https://www.php.net/manual/zh/reserved.variables.session.php)
- [$_REQUEST](https://www.php.net/manual/zh/reserved.variables.request.php)
- [$_ENV](https://www.php.net/manual/zh/reserved.variables.environment.php)

## 基础

- 描述变量使用`$`或者`${}`, 前者会匹配更多字符让其合法
- `<?php echo`==`<?=`
- 纯php文件文末结束符可省略
- 支持`#`,`//`,`/* */`注释(`//,#`后面的`?>`不会被注释), `/* */`不可嵌套
- [PHP 支持 10 种原始数据类型](https://www.php.net/manual/zh/language.types.intro.php)
- 如果想查看某个[表达式](https://www.php.net/manual/zh/language.expressions.php)的值和类型，用 [var_dump()](https://www.php.net/manual/zh/function.var-dump.php) 函数。
- 如果只是想得到一个易读懂的类型的表达方式用于调试，用 [gettype()](https://www.php.net/manual/zh/function.gettype.php) 函数。要检验某个类型，*不要*用 [gettype()](https://www.php.net/manual/zh/function.gettype.php)，而用 `is_type` 函数
- 如果要将一个变量强制转换为某类型，可以对其使用[强制转换](https://www.php.net/manual/zh/language.types.type-juggling.php#language.types.typecasting)或者 [settype()](https://www.php.net/manual/zh/function.settype.php) 函数, 使用[*](https://www.php.net/manual/zh/language.types.type-juggling.php)符号也能改变类型

### 整型

- 要使用八进制表达，数字前必须加上 `0`（零）。要使用十六进制表达，数字前必须加上 `0x`。要使用二进制表达，数字前必须加上 `0b`
- 将 resource 转换成 integer 时， 结果会是 PHP 运行时为 resource 分配的唯一资源号
- **PHP 7.4.0** 之前不支持`_`, 如`1_234`

### 浮点型

- 永远不要相信浮点数结果精确到了最后一位，也永远不要比较两个浮点数是否相等。如果确实需要更高的精度，应该使用[任意精度数学函数](https://www.php.net/manual/zh/ref.bc.php)或者 [gmp 函数](https://www.php.net/manual/zh/ref.gmp.php)
- 由于 **`NAN`** 代表着任何不同值，不应拿 **`NAN`** 去和其它值进行比较，包括其自身，应该用 [is_nan()](https://www.php.net/manual/zh/function.is-nan.php) 来检查

### String字符串

- `.`与`.=`

```php
<?php
$a = "Hello ";
$b = $a . "World!"; // now $b contains "Hello World!"

$a = "Hello ";
$a .= "World!";     // now $a contains "Hello World!"
?>
```

- 单引号代表的字符串里的`\`转义符能转`'\`两个字符, `\n`没有任何含义, 在单引号里的`$`失去了变量的含义(类似linux)
- 双引号里的`\`能转移一些特殊字母和解析`$`变量
- 在`{}`里面可以使用多重变量, 如

```php
<?php
class foo {
    var $bar = 'I am bar.';
}

$foo = new foo();
$bar = 'bar';
$baz = array('foo', 'bar', 'baz', 'quux');
echo "{$foo->$bar}\n";
echo "{$foo->{$baz[1]}}\n";
?>
```

- []与{}都可以访问字符串片段
- `.`可以连接字符串

#### heredoc结构

类似linux的`cat > file.name << eof`, 可输入转义字符和变量, 如

```PHP
<?php
$str = <<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD;
?>
```

[更多用法](https://www.php.net/manual/zh/language.types.string.php)

#### newdoc结构

- 与heredoc的区别是不具备转义和解析变量的能力

```php
<?php
$str = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;
?>
```

### Array数组

```php
<?php
$array = array(
    "foo" => "bar",
    "bar" => "foo",
);

// 自 PHP 5.4 起
$array = [
    "foo" => "bar",
    "bar" => "foo",
];
?>
```

- PHP的Array支持键值对
- 可以使用`array()`或者`[]`初始化一个array对象
- `key`只能是`interge`和`string`
- 使用`print_r`或者`var_dump`函数来输出array
- 要删除某键值对，对其调用 [unset()](https://www.php.net/manual/zh/function.unset.php) 函数。
- [unset()](https://www.php.net/manual/zh/function.unset.php) 函数允许删除数组中的某个键。但要注意数组将*不会*重建索引。如果需要删除后重建索引，可以用 [array_values()](https://www.php.net/manual/zh/function.array-values.php) 函数
- [foreach](https://www.php.net/manual/zh/control-structrues.foreach.php) 控制结构是专门用于数组的。它提供了一个简单的方法来遍历数组。
- 数组最后一个元素的 `$value` 引用在 `foreach` 循环之后仍会保留。建议使用 [unset()](https://www.php.net/manual/zh/function.unset.php) 来将其销毁。

### Iterable

> [Iterable](https://www.php.net/manual/zh/language.types.iterable.php)是 PHP 7.1 中引入的一个伪类型。它接受任何 array 或实现了 **Traversable** 接口的对象。这些类型都能用 [foreach](https://www.php.net/manual/zh/control-structrues.foreach.php) 迭代， 也可以和 [生成器](https://www.php.net/manual/zh/language.generators.php) 里的 **yield from** 一起使用

- 类在扩展/实现（extending/implementing）的时候， 可以将参数类型从 array 或 **Traversable** 放宽到 [iterable](https://www.php.net/manual/zh/language.types.iterable.php)， 也可以将返回类型 [iterable](https://www.php.net/manual/zh/language.types.iterable.php) 的范围缩小到 array 或 **Traversable**

### Resource

资源 resource 是一种特殊变量，保存了到外部资源的一个引用。资源是通过专门的函数来建立和使用的。所有这些函数及其相应资源类型见[附录](https://www.php.net/manual/zh/resource.php)。

> 参见 [get_resource_type()](https://www.php.net/manual/zh/function.get-resource-type.php)
>
> 持久数据库连接比较特殊，它们*不会*被垃圾回收系统销毁。参见[数据库永久连接](https://www.php.net/manual/zh/featrues.persistent-connections.php)一章

### NULL

null不区分大小写

> PHP8.0.0新增了一个类型[mixed](https://www.php.net/manual/zh/language.types.declarations.php#language.types.declarations.mixed), 代表任意类型
>
> [`namespace`](https://www.php.net/manual/zh/userlandnaming.tips.php)可以避免与其它用户空间代码出现命名空间冲突

## 变量

- **PHP变量区分大小写**
- 变量名规则`^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$`	
- PHP变量名可以使用中文
- `&`[引用赋值(只有有名字的变量才可以引用赋值)](https://www.php.net/manual/zh/language.references.php)


- PHP 提供了大量的预定义变量, [超全局变量列表](https://www.php.net/manual/zh/language.variables.superglobals.php)
- PHP 中全局变量在函数中使用时必须声明为 `global`或者使用[$GLOBALS](https://www.php.net/manual/zh/reserved.variables.globals.php)数组

```php
# global
<?php
$a = 1;
$b = 2;

function Sum() {
    global $a, $b;

    $b = $a + $b;
}

Sum();
echo $b;

# GLOBALS
$a = 1;
$b = 2;

function Sum()
{
    $GLOBALS['b'] = $GLOBALS['a'] + $GLOBALS['b'];
}

Sum();
echo $b;
?>
```

- 静态变量在离开函数后不会被销毁, 声明`static $var`
- 可变变量使用`$$`

> 要将可变变量用于数组，必须解决一个模棱两可的问题。这就是当写下 `$$a[1]` 时，解析器需要知道是想要 `$a[1]` 作为一个变量呢，还是想要 `$$a` 作为一个变量并取出该变量中索引为 [1] 的值。解决此问题的语法是，对第一种情况用 `${$a[1]}`，对第二种情况用 `${$a}[1]`
>
> 对于对象, `$foo->$bar`将bar解析后作为foo的属性
>
> **注意**: 在 PHP 的函数和类的方法中，[超全局变量](https://www.php.net/manual/zh/language.variables.superglobals.php)不能用作可变变量。`$this` 变量也是一个特殊变量，不能被动态引用

## 常量

- 定义规则`^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$`
- 使用[define(name, value)](https://www.php.net/manual/zh/function.define.php) 和const定义一个常量

> const打小写敏感

- [PHP预定义常量](https://www.php.net/manual/zh/language.constants.predefined.php)

## 表达式

- 三元表达式

```php
$first ? $second : $third
```

### 运算符

- 除了基本的比较运算符外, PHP还支持`===(值与类型相等)`和`!==`
- PHP支持递增和递减运算符和`**`运算符
- PHP 支持引用赋值，使用`$var = &$othervar;`语法。引用赋值意味着两个变量指向了同一个数据(类型linux硬链接)

> [对象复制](https://www.php.net/manual/zh/language.oop5.cloning.php)

- [new](https://www.php.net/manual/zh/language.oop5.basic.php#language.oop5.basic.new) 运算符自动返回一个引用，因此对 [new](https://www.php.net/manual/zh/language.oop5.basic.php#language.oop5.basic.new) 的结果进行引用赋值是错误的
- [NULL 合并运算符`??`](https://www.php.net/manual/zh/language.operators.comparison.php#language.operators.comparison.coalesce)
- `<=>`返回-1 0 1
- PHP 支持一个错误控制运算符：@。当将其放置在一个 PHP 表达式之前，该表达式可能产生的任何错误信息都被忽略掉。

> @ 运算符只对[表达式](https://www.php.net/manual/zh/language.expressions.php)有效。对新手来说一个简单的规则就是：如果能从某处得到值，就能在它前面加上 @ 运算符

- `(``)`命令执行运算符

```php
<?php
$output = `ls -al`;#输出当前目录所有文件及详细信息
echo "<pre>$output</pre>";
?>
```

> 在windows上, 如果输出是二进制文件, 需要使用[popen()](https://www.php.net/manual/zh/function.popen.php), 因为windows的管道是以文件形式打开的

- `&&,||,`比`and,or`运算优先级高. 
- [数组运算符](https://www.php.net/manual/zh/language.operators.array.php)
- `instanceof` 用于确定一个 PHP 变量是否属于某一类 [class](https://www.php.net/manual/zh/language.oop5.basic.php#language.oop5.basic.class),确定一个变量是不是继承自某一父类的子类

## 流程控制

- `elseif`与`else if`语义一样, 区别在于前者可以使用冒号, 后者不行

```php
<?php

/* 不正确的使用方法： */
if ($a > $b):
    echo $a." is greater than ".$b;
else if ($a == $b): // 将无法编译
    echo "The above line causes a parse error.";
endif;


/* 正确的使用方法： */
if ($a > $b):
    echo $a." is greater than ".$b;
elseif ($a == $b): // 注意使用了一个单词的 elseif
    echo $a." equals ".$b;
else:
    echo $a." is neither greater than or equal to ".$b;
endif;

?>
```

- PHP 提供了一些流程控制的替代语法，包括 `if`，`while`，`for`，`foreach` 和 `switch`。替代语法的基本形式是把左花括号（{）换成冒号（:），把右花括号（}）分别换成 `endif;`，`endwhile;`，`endfor;`，`endforeach;` 以及 `endswitch;`

```php+HTML
<?php if ($a == 5): ?>
A is equal to 5
<?php endif; ?>

<?php
if ($a == 5):
    echo "a equals 5";
    echo "...";
elseif ($a == 6):
    echo "a equals 6";
    echo "!!!";
else:
    echo "a is neither 5 nor 6";
endif;
?>
```

> 注意如果不是`^<?php`这样写的话会输出空格

- foreach不支持使用@来抑制错误信息

## 函数

- 使用默认参数时，任何默认参数必须放在任何非默认参数的右侧
- `...`指定可变参数, 也可用于传递array作为函数参数
- `:`命名参数允许传入乱序的参数, 需要指定参数名
- 命名参数也可以与位置参数相结合使用。此种情况下，命名参数必须在位置参数之后
- PHP支持可变函数, 函数名和方法名都可以使用变量指定
- 箭头函数支持与 [匿名函数](https://www.php.net/manual/zh/functions.anonymous.php) 相同的功能，只是其父作用域的变量总是自动的
  - 会参考参数去父作用域中寻找是否有该值
- 匿名函数需要使用`use`继承父作用域的变量

```php
$message = 'hello';

// 继承 $message
$example = function () use ($message) {
    var_dump($message);
};
```

- 匿名函数会自动绑定当前实例`this`, 可以使用静态匿名函数阻止绑定

## 常用函数

```php
# 取整(PHP4,5,6,7,8),参数mode传入常量,代表四舍五入还是直接舍去小数
round ( float $val , int $precision = 0 , int $mode = PHP_ROUND_HALF_UP ) : float
# 整除(PHP7,8)
intdiv ( int $dividend , int $divisor ) : int
```

- [isset()](https://www.php.net/manual/zh/function.isset.php)
- [substr()](https://www.php.net/manual/zh/function.substr.php)
- [substr_replace()](https://www.php.net/manual/zh/function.substr-replace.php)
- [字符串函数](https://www.php.net/manual/zh/ref.strings.php)
- [数组函数](https://www.php.net/manual/zh/ref.array.php)
- [变量函数](https://www.php.net/manual/zh/ref.var.php)
- [数学函数](https://www.php.net/manual/zh/ref.math.php)
- [error_get_last()](https://www.php.net/manual/zh/function.error-get-last.php)
- [shell_exec()](https://www.php.net/manual/zh/function.shell-exec.php)
- [get_class()](https://www.php.net/manual/zh/function.get-class.php)
- [is_a()](https://www.php.net/manual/zh/function.is-a.php)

## 语言结构

> 语言结构就是PHP本身支持的语句, 比如`echo, print`等.
>
> 与函数的区别在于语句的运行速度快, 但缺少了函数的一些特性, 比如函数可以接受其他函数返回的参数等

- [list()](https://www.php.net/manual/zh/function.list.php): 解构赋值?
- [array()](https://www.php.net/manual/zh/function.array.php)
- [echo](https://www.php.net/manual/zh/function.echo.php)
- [eval()](https://www.php.net/manual/zh/function.eval.php)

## 文本处理

[RCRE](https://www.php.net/manual/zh/regexp.reference.delimiters.php)