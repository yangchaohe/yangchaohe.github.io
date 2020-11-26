## 界面功能

![od1](https://cdn.jsdelivr.net/gh/shepherdev/shepherdev.github.io@picgo/static/article/od01.png)

## 快捷键

![od02](https://cdn.jsdelivr.net/gh/shepherdev/shepherdev.github.io@picgo/static/article/od02.png)

## 破解方向(无壳)

- 从消息框入手(MessageBox, GetDlgItemTextA...)
- 从提示字符串入手(直接查找字符串跟随地址分析)

> 不建议不断使用断点进行调试, 大概率陷入死循环(windows使用消息队列将各种操作分配给应用程序, 如果没有从窗口执行操作, 那会导致消息队列为空, 导致循环)
>
> ![](https://cdn.jsdelivr.net/gh/shepherdev/shepherdev.github.io@picgo/static/article/od03.png)

## 术语参照

- 领空: 在某时刻CPU执行的代码的所有者, 004013F7一般是执行文件的领空, 7C8114AB一般是DLL的领空
- 