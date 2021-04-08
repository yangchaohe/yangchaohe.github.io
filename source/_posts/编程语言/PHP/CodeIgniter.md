---
title: CI框架
date: 2021-3.20 12:00
author: manu
toc: true
categories: [编程语言,PHP]
tags: PHP
---

> CodeIgniter 是一个小巧但功能强大的 PHP 框架，作为一个简单而“优雅”的工具包，它可以为开发者们建立功能完善的 Web 应用程序。

<!-- more -->

## Controller

- 采用MVC的常见url: 

  ```html
  http://example.com/[controller-class]/[controller-method]/[arguments]
  ```

- 控制器将是你 Web 应用程序中处理请求的核心

- [linux]控制器文件名严格区分大小写

## Model

- 遵循MVC, 需要将数据库的操作代码写在模型（Model）文件里面

## 踩的坑

在CodeIgniterI4.11里面, request的getVar等方法需要添加下面的代码

```php
/**
	 * Instance of the main Request object.
	 *
	 * @var HTTP\IncomingRequest
	 */
	protected $request;
```

写数据库需要allowedFields

将app/config/filter.php里的toolbar取消