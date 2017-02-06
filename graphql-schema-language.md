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
