```c
#include <stdio.h>

#include <string.h>

int mycmp( const char* a,const char* b ){
	int idx = 0;
	while ( a[idx] == b[idx] && a[idx] != '\0'){
		idx++;
	}
	return a[idx]-b[idx];
}

int main(int argc, char const *argv[])
{
	char *a, *b;
	a = "abcd";
	b = "abca";
	printf("mycmp:%d\n", mycmp(a,b));
	printf("strcmp:%d\n", strcmp(a,b));

	return 0;
}
```

