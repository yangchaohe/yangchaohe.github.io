---
title: 理解字典、列表
date: 2020-3-26
author: manu
toc: true
categories: Python
tags: 字典

---

字典类似列表，列表使用''索引-数据"的形式存储数据，字典使用键值对的形式存储数据

列表只能存储一种数据类型，而且索引固定

字典的“键”和“值”可以是任意类型，这里的“键”相当于列表的索引

列表在内存的数据是有序的，字典是无序的

<!-- more -->

```python
# 创建字典
stu1 = { "name":"manu","age":19,"gender":"male" }
# 添加
stu1["hobby"]  = "coding"
# 访问
print(stu1["name"])
# 修改
stu1["age"] = 20
# 删除
del stu1["gender"]
```

## 字典与列表的嵌套

```python
# 创建一个存储所有学生的列表，里面包含学生的各种信息
stu = [{ "name":"manu","age":19,"gender":"male" },
        { "name":"manu","age":19,"gender":"male" },
        { "name":"后排","age":19,"gender":"male" },
        { "name":"sb1号","age":19,"gender":"male" },
        { "name":"sb2号","age":19,"gender":"male" }]
# 访问
print(stu[2]["name"])

# 字典里面嵌套列表
stu2 = { "name":"manu",
        "age":19,"gender":"male",
        "hobby":["programing","coding"]}
print(stu2["hobby"][1])
```

## 判断是否相等

```python
d1 == d2
# 等于返回True
```

- 列表是有顺序的，判断时顺序不对也就不相等
- 字典是无序的，键和值对等则就相等

## 遍历

### 键

```python
# m1
for i in dict1.keys():
    print(i)
# m2
print(dict1.keys)
# m3 
keys = list(dict1.keys)
print(keys)
```

### 值

```python
# m1
for i in dict1.values():
    print(i)
# m2
print(dict1.values)
# m3 
values = list(dict1.values)
print(values)
```

### 键值对

```python
# m1 通过items返回的是一个元组)
for i in dict1.items():
	print(i)
	# 单独访问键与值
	print(i[0],i[1])
    
# m2 
for k,v in dict1.items():
	# 单独访问键与值
	print(k,v)
```

### 判断是否存在

```python
# 判断是否存在值，返回布尔值
"test" in dict1.values()
# 判断是否存在键，返回布尔值
"test" in dict1.keys()
# 默认判断键
"test" in dict1
```

### 默认值

一般情况下使用字典都不会知道里面的数据，可以设置一个默认值

```python
# 当key存在则使用它的值，不存在则使用默认值
dict1.setdefault("key","value")
```

