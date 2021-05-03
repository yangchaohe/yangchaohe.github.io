---
thumbnail:
title: 微信小程序笔记
date: 2021-3-3
tags:
categories: [前端] 
toc: true
recommend: 1
mathJax: false
---

微信小程序的学习记录和坑

<!-- more -->

- app.json控制着全局静态数据，比如title，backgroundcolor，tabbar..以及首页page（第一个）
- 注册页面有个behaviours，可以将某个页面的属性，字段，方法与当前页面合并（区分组件），需要使用`module.exports = Behaviour(...)`将数据暴露(区分模块)，`require()`引用，不支持绝对路径
- Page注册普通页面，Component可以注册组件，类似标签
- wxss建议采用flex布局
- 老老实实使用回调，但需要避免代码被割裂
- 考虑SPA
- 得到查询语句+建立数据库banner表
- [wx.createSelectorQuery()](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html)类DOM
- [注意target和currentTarget](https://blog.csdn.net/Syleapn/article/details/81289337)
- 浏览器调试后端接口没问题, 开发工具调试出问题, 不要慌, 这种大概率是请求头不对, 比如Get请求上传参数时需要对参数进行编码, 浏览器一般默认采用`application/x-www-form-urlencoded`, 开发工具需要自己设置下
- `wx.switchTab`才能跳转tarbar界面

> GET与POST
>  1.GET在浏览器回退时是无害的，而POST会再次提交请求。
>  2.GET产生的URL地址可以被Bookmark，而POST不可以。
>  3.GET请求会被浏览器主动cache，而POST不会，除非手动设置。
>  **4.GET请求只能进行url编码，而POST支持多种编码方式。**
>  5.GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
>  6.GET请求在URL中传送的参数是有长度限制的，而POST没有。
>  7.对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
>  8.GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
>  9.GET参数通过URL传递，POST放在Request body中