```c
#include <stdio.h>

int mylen( const char* s)
{
	int index=0;
	while( s[index] != '\0' ){
		index++;
	}
	return index;
}
int main(int argc, char const *argv[])
{
	char *a;
	a = "hello";
	printf("mylen:%d\n", mylen(a));

	return 0;
}

```

