#### typedef:

功能：代替已有类型

优点：增加可读性

格式

```c
typedef 类型 自定义名字			
```

实例：

```c
typedef struct{
	int month;
	int day;
	int year;
}Date;
//Date代表这个struct；那Date还是不是变量；
```

```c
typedef int Length;//Length代替int

typedef *char[10] Strings;//Strings是10个字符串的数组类型(?)

typedef struct node{
	int data;
	struct node *next;
}aNote;

或

typedef struct node aNode;//aNode可以代替struct node；
```

