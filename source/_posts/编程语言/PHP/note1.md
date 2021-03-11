---
title: php-note1
date: 2021-3.9 15:00
author: manu
toc: true
categories: [编程语言,PHP]
tags: PHP
---

## PHP的超全局变量

- [$_SERVER](https://www.php.net/manual/zh/reserved.variables.server.php)是PHP里面的超全局变量, 包含了web服务器提供的所有信息.可通过`phpinfo()`查看

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
- [foreach](https://www.php.net/manual/zh/control-structures.foreach.php) 控制结构是专门用于数组的。它提供了一个简单的方法来遍历数组。
- 数组最后一个元素的 `$value` 引用在 `foreach` 循环之后仍会保留。建议使用 [unset()](https://www.php.net/manual/zh/function.unset.php) 来将其销毁。

### Iterable

> [Iterable](https://www.php.net/manual/zh/language.types.iterable.php)是 PHP 7.1 中引入的一个伪类型。它接受任何 array 或实现了 **Traversable** 接口的对象。这些类型都能用 [foreach](https://www.php.net/manual/zh/control-structures.foreach.php) 迭代， 也可以和 [生成器](https://www.php.net/manual/zh/language.generators.php) 里的 **yield from** 一起使用

- 类在扩展/实现（extending/implementing）的时候， 可以将参数类型从 array 或 **Traversable** 放宽到 [iterable](https://www.php.net/manual/zh/language.types.iterable.php)， 也可以将返回类型 [iterable](https://www.php.net/manual/zh/language.types.iterable.php) 的范围缩小到 array 或 **Traversable**

### Resource

资源 resource 是一种特殊变量，保存了到外部资源的一个引用。资源是通过专门的函数来建立和使用的。所有这些函数及其相应资源类型见[附录](https://www.php.net/manual/zh/resource.php)。

> 参见 [get_resource_type()](https://www.php.net/manual/zh/function.get-resource-type.php)
>
> 持久数据库连接比较特殊，它们*不会*被垃圾回收系统销毁。参见[数据库永久连接](https://www.php.net/manual/zh/features.persistent-connections.php)一章

### NULL

null不区分大小写

## 语法

### 变量

- 变量名规则`^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$`	



## 常用函数

```php
# 取整(PHP4,5,6,7,8),参数mode传入常量,代表四舍五入还是直接舍去小数
round ( float $val , int $precision = 0 , int $mode = PHP_ROUND_HALF_UP ) : float
# 整除(PHP7,8)
intdiv ( int $dividend , int $divisor ) : int
```

[substr](https://www.php.net/manual/zh/function.substr.php)

[substr_replace](https://www.php.net/manual/zh/function.substr-replace.php)

[字符串函数](https://www.php.net/manual/zh/ref.strings.php)

[数组函数](https://www.php.net/manual/zh/ref.array.php)