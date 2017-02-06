# GraphQL Schema语言


## 类型系统 Type System

每个GraphQL服务定义一个完整的可能的数据类型集合。当请求到来时，可以根据这个来做验证(Validation)和执行(Excution)。


## 类型语言 Type Language

GraphQL可以用任意编程语言实现，所以它并不依赖任意特定语言的语法。
在描述GraphQL Schema的时候，需要定义一种简单的描述语言，这就是“GraphQL Schema语言”。
它类似于查询语句，以一种独立于具体实现语言的方式来描述GraphQL Schema。

## Object types and fields
 GraphQL schema中最基本的元素是对象类型，他定义了一个可以从服务获得的对象类型及其具备的field。一个具体的例子如下所示

```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

* `Character`是`GraphQL Object Type`，表示它是一个具备一些field的类型。在schema中多数类型都是`object type`
* `name`和`appearsIn`是`Character`这个类型的fields。在任何作用于`Character`类型的GraphQL查询中，只能出现这2个field。
* `String`是一种原生的`Scalar type`，这些类型被解析成当个的额标量对象，并不包含子项。
* `String!`表示这是一个`non-nullable`的field，查询时一定会返回一个值的。
* `[Episode]!`表示一个Episode的数组对象，由于是非空的，所以总会获得一个由零个或多个item组成的数组。


## 参数 Arguments

每个GraphQL对象类型的field都可以包含零个或多个参数，比如下面的`length`field。

```
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

所有的field参数都会具体命名，二不像其他语言一样是一个有序的列表。也可以为参数定义默认值。

## `Query`和`Mutation`类型

每个GraphQL Service都有一个`query`类型，并可能有一个`mutation`类型。
这些类型和普通对象类型一样，不过他们是每个GraphQL Query的入口点（entry point）。
需要注意的是，除了被定义成schema的"entry point"以外，Query和Mutation类型和其他GraphQL 对象类型一样，他们的field也一样。

```
schema {
  query: Query
  mutation: Mutation
}
```

如下查询意味着服务需要定义一个Query类型，具备hero和droid2个field：

```
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
```

如下
```
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

Mutation类型也一样，在Mutation类型下定义field，这些是在query里面调用的root mutation field。

## 标量类型 Scalar types

GraphQL 对象类型具备名称和field，不过这些field最终需要被解析成具体数据，这就是标量类型存在的意义，他们代表query的叶节点。GraphQL预定义了一些默认的标量类型：

* **Int** 带符号32bit整形值
* **Float** 带符号双精度浮点值
* **String** UTF-8字符串序列
* **Boolean** ture或false
* **ID** 代表唯一标识符，往往用于获取对象或者作为一个key。ID类型最终被序列号成String，不过定义为ID表示这个字段不是human-readable的。

在很多GraphQL实现中，也定义了一些自定义的标量，比如可以定义`Date`类型，这是需要根据实现方式决定最终如何序列化。

```
scalar Date
```

## 枚举类型 Enumeration types

枚举类型是一种特别的标量类型，它的值被限制于一个特定允许类型的集合。这时允许：

1. Validate 这个类型的任意参数是某个允许类型
2. 通过类型通信确保field总是有限集合的数据之一

一个具体的定义如下，意味着无论何时我们使用Episode的时候，他都是`NEWHOPE`，`EMPIRE`和`JEDI`三个值之一。
```
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

在不同语言实现的GraphQL服务里，处理enum的方式是不一样的。有些语言直接支持enum，实现时可以利用这个机制；有些语言比如JavaScript并没有enum支持，这些值可能在内部被映射成整数集合。不过，这些实现细节都不会透露给客户端，客户端仅使用枚举类型的字符串进行操作。

## 列表和非空类型 Lists and Non-Null

对象，标量和枚举是在GraphQL里面仅可以定义的数据类型。不过当这些类型在schema其他地方使用时，可以添加额外的类型描述于这些类型之上。比如

```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

这里首先使用了一个`String`类型，并通过添加感叹号将其标识为`Non-Null`的。另外，在定义field的参数时，也可以用这个属性如下

```
query DroidById($id: ID!) {
  droid(id: $id) {
    name
  }
}
```

类似的，可以使用方括号`[]`来定义列表，这个定义既可以使用在field里，也可以使用在argument里。

最后，Non-Null和List可以混合使用，比如，可以定义一个非空字符串的列表如下

```
myField: [String!]
```

这里数组本身可以是空的，但是里面的字符串不可以是空的，比如

```
myField: null // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
```

类似的，可以定义一个非空的字符串列表如下

```
myField: [String]!
```

这时，列表本身不可以为空，但是可以包含空的元素，比如

```
myField: null // error
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```