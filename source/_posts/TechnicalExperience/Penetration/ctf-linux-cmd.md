---
title: ctf-linux-cmd.md
toc: true
recommend: 1
uniqueId: '2021-11-09 07:01:45/ctf-linux-cmd.md.html'
mathJax: false
date: 2021-11-09 15:01:45
thumbnail:
tags:
categories:
keywords:
---
> 使用 linux 系统解题的一些小技巧

<!-- more -->

1. 将文本内容进行 url 编码

```bash
cat file.txt | xxd -plain | sed -r 's/(..)/%\1/g' | tr -d '\n'
```

2. 将文本内容进行 url 解码

```bash
echo -n '%68%65%6c%6c%6f' | sed 's/%//g' | xxd -r -p
echo -n '%68%65%6c%6c%6f' | tr -d '%' | xxd -r -p
```

3. bc 进制转换

```bash
echo "obase=16;ibase=2;11101" | bc
```

