---
thumbnail:
title: vue学习笔记
date: 2021-4-2
tags:
categories: [前端,VUE]
toc: true
recommend: 1
keywords: 
mathJax: false
---

> Custom Elements 标准
> "自定义元素的名字必须包含一个破折号（-）所以<x-tags>、<my-element>和<my-awesome-app>都是正确的名字，而<tabs>和<foo_bar>是不正确的。这样的限制使得 HTML 解析器可以分辨那些是标准元素，哪些是自定义元素。"
> Safari 10.1+、Chrome 54+ 和 Firefox 63+ 原生支持 Web Components
> Vue里面所有东西都是响应式的
<!-- more -->
## vue实例

``` js
	var obj = {
	  foo: 'bar'
	}
	
	new Vue({
	  el: '#app',
	  data: obj
	})
```

> 当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中
> Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 $，以便与用户定义的 property 区分开来
> 详情点击[API 文档](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)

- 使用 Object.freeze(obj)方法，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化

## 生命周期钩子

> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

- [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
	- created: 在一个实例被创建之后执行代码

> 在定义生命周期函数时千万不要使用箭头函数，会污染外层this

## 模板语法

### 文本插值

``` html
<span>Message: {{ msg }}</span>
```

`{{msg}}`会被替换成实例里的`msg`值

> `v-once`指令只进行一次性的插值
> `{{}}`不会把数据解析成html标签, 对此请使用`v-html`指令, 使用需谨慎

### 属性插值

在属性里不能使用`{{}}`

```html
<div v-bind:id="dynamicId"></div>
```

> vue规定, 对于bool值, 如果非true, 则该属性不会显示出来
> 在`{{}}`和`" "`中几乎支持所有js**单个**表达式
> 不应该在表达式里访问用户的全局变量

### 指令

就是一系列以`v-`作为前缀的东西, 可以根据其值来影响标签在DOM的表现

比如`v-bind:attr='var'`用于将attr与变量var值绑定

而`v-on:event='callback'`用来监听DOM事件

> v-bind可以简写为`:`
 > v-on简写为`@`

### 动态属性(vue>=2.6.0)

`v-bind:[attributeName]="url"`

attributeName被作为JS表达式解析, 也会去data里查找该值

> 注意: 在[]中不能使用空格和引号, 避免大小写, 必须返回字符串, null则代表移除

## 计算属性

对于任何复杂逻辑，你都应当使用计算属性

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: {
    // 计算属性的 getter
        get: function () {
          // `this` 指向 vm 实例
          return this.message.split('').reverse().join('')
        }
    // set: 可提供setter方法, 提供参数会调用这个方法
    }
  }
})
```

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

> 虽然方法也能达到相同的效果, 但计算属性多了一个缓存的功能, 原始数据不改变则返回之间的计算结果
> 

## 侦听器

设置`v-model='attr'`后,attr会与data.attr双向绑定
在实例化Vue时如果提供`watch.attr()`选项, 则数据改变同时会触发该函数

> 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

实例: 

```html
<div id="watch-example">
    <input v-model="question">
    <p>{{ answer }}</p>
</div>
```

```js
var vm = new Vue({
  el: '#watch-example',
  data: {
    question: ''
    answer: 'I cannot give you an answer until you ask a question!
  },
  watch: {
    // 侦听data的属性
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
    }
})
```

## 计算属性VS侦听器

在一般情况下, 选择计算机属性会更好, 需要使用异步或其他开销大的操作时, 才会使用侦听器




