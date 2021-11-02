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

2. sql 注入：1.5h+1.5h+1h+2h+2h+85min

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

        1. Chrome->F12->...->More tools->Nerwork conditions
        2. Chrome 插件 Hackbar

    - [x] Referer 注入：来源网页

        修改方法

        1. Chrome 插件 hackbar

3. xss 注入：20 min

    - [x] 反射型 XSS

4. 文件上传：10h +76min
    - [x] 无验证，直接上传

    - [x] 前端验证（js）

        判断方法：

        1. 抓包查看是否有文件内容，没有则是前端验证

        解法：

        1. 禁用 JS：Chrome->F12->Settings->Debugger->Disable JavaScript
        2. 通过前端验证后抓包修改
        3. 调试JS（不实用）

    - [x] `.htaccess` 绕过：如果目录下有 `.htaccess` 文件，且服务器允许配置，则可添加一条 MIME type 解析规则进行绕过

        示例：将 `.png` 当成 `php` 解析

        ```
        AddType application/x-httpd-php .png
        ```

    - [x] MIME 校验：如果后端是验证 Content-Type，可以抓包后修改成 `image/png` 或者其他不会被检测的 MIME-type 绕过。（`cat /etc/mime.types`）

    - [x] 文件头绕过：后端如果验证的是文件头，可以在后门文件头部伪造成其他的文件绕过

    - [x] 00 截断：在 PHP<5.3.4 的版本中，存在 00 截断漏洞（底层 C），抓包在上传路径了添加 `%00` 即可忽略后面的文件名

    - [x] 双写后缀绕过：

        审记源码

        ```php
        $name = basename($_FILES['file']['name']);
        $blacklist = array("php", "php5", "php4", "php3", "phtml", "pht", "jsp", "jspa", "jspx", "jsw", "jsv", "jspf", "jtml", "asp", "aspx", "asa", "asax", "ascx", "ashx", "asmx", "cer", "swf", "htaccess", "ini");
        $name = str_ireplace($blacklist, "", $name);
        ```

        漏洞：双写后缀，如 `.pphphp`

    - [x] 条件竞争：利用后台先上传后检查的漏洞暴力植入后门脚本

        示例文件

        ```php
        <?php fputs(fopen('xiao.php','w'),'<?php eval($_REQUEST[1]);?>');?>
        ```

        

    

