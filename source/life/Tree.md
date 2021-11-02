## PHP

1. Laravel 开发 Web 项目 (65%)
2. PHP 1000h 计划 (16h+45min*22)

## 网络安全

### CTF

1. 信息泄漏

    - [x] 目录遍历
    - [x] phpinfo
    - [x] 备份文件（dirsearch）
    - [x] Git 泄漏（log）

2. sql注入：1.5h+1.5h+1h+2h+2h+85min

    涉及的注入技术（ 手工+BP 及 sqlmap ）

    - [x] 布尔型盲注（Boolean-based blind）

    - [x] 时间型盲注（Time-based blind）

    - [x] 报错型注入（Error-based）

    - [ ] 联合查询注入（UNION query-based）

    - [ ] 堆叠查询注入（Stacked queries）

    杂项

    - [x] Cookie 注入：指修改 Cookie 进行注入

    - [x] 过滤空格

        后端如果将空格作为过滤项，这时可以使用 `/**/` 代替空格绕过

        对于一些强大的过滤代码，还有 url 编码 `%a0` 绕过

    - [x] UA注入：服务器根据 UA 返回对应的客户端网页（手机，电脑）

        修改方法

        1. chrome->F12->...->More tools->Nerwork conditions
        2. chrome 插件 hackbar

    - [x] Referer注入：来源网页

        修改方法

        1. chrome 插件 hackbar

