####  联合union:

- **存储**：
  - 所有的成员共享一个空间
  - 同一时间只有一个成员是有效的
  - union的大小是其最大的成员
- 初始化
  - 对第一个做初始化



```c
#include <stdio.h>

typedef union{
	int i;
	char ch[sizeof(int)];
} CHI;

int main(int argc, char const *argv[])
{
	CHI chi;
	int i;
	chi.i = 1234;
	for ( i = 0; i<sizeof(int); i++ ){
		printf("%02hhx", chi.ch[i]);
	}
	
	return 0;
}
```

![image-20191116084233954](C:\Users\Yang Yong\AppData\Roaming\Typora\typora-user-images\image-20191116084233954.png)

