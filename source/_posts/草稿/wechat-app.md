- app.json控制着全局静态数据，比如title，backgroundcolor，tabbar..以及首页page（第一个）
- 注册页面有个behaviours，可以将某个页面的属性，字段，方法与当前页面合并（区分组件），需要使用`module.exports = Behaviour(...)`将数据暴露(区分模块)，`require()`引用，不支持绝对路径
- Page注册普通页面，Component可以注册组件，类似标签
- wxss建议采用flex布局
- 老老实实使用回调，但需要避免代码被割裂
- 考虑SPA
- banner表字段：id url
- 得到查询语句+建立数据库banner表

