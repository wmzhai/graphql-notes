# 相关概念


## GraphQL Document

> A string written in the GraphQL language that defines one or more operations and fragments.

## Operation

> A single query, mutation, or subscription that can be interpreted by a GraphQL execution engine.

![](/imgs/simple-query.png)

## Field

> A unit of data you are asking for, which ends up as a field in your JSON response data. Note that they are always called “fields”, regardless of how deep in the query they appear. A field on the root of your operation works the same way as one nested deeper in the query.

# Arguments

> A set of key-value pairs attached to a specific field. These are passed into the server-side execution of this field, and affect how it’s resolved. The arguments can be literal values, as in the query above, or variables, as in the examples below. Note that arguments can appear on any field, even fields nested deep in an operation.


## Operation Type

> This is either query, mutation, or subscription. It describes what type of operation you’re trying to do. While all of them look similar in the language, they have slightly different modes of execution on a spec-compliant GraphQL server.

## Operation Name

> For debugging and server-side logging reasons, it’s useful to give your queries meaningful names. That way, when you see something wrong going on either in your network logs or your GraphQL server (for example in a tool like Apollo Optics), you can easily find that query in your codebase by name instead of trying to decipher the contents. Think of it like a function name in your favorite programming language.

## Variable Definitions

> When you send a query to your GraphQL server, you might have some dynamic parts that change between requests, while the actual query document stays the same. These are the variables of your query. Because GraphQL is statically typed, it can actually validate for you that you are passing in the right variables. This is where you declare the types of variables you are planning to provide.

## Variables

> The dictionary of values passed along with a GraphQL operation, that provides dynamic parameters to that operation.

## Selection Set

> A set of fields requested in an operation, or nested within another field. A GraphQL query must contain a selection set on any field that returns an object type, and selection sets are not allowed on fields that return scalar types, such as Int or String.


## Fragment Definition

> Part of a GraphQL document which defines a GraphQL fragment. This is also sometimes called a named fragment, in contrast to an inline fragment which we’ll get to below.


## Fragment Name

> The name of each fragment has to be unique within a GraphQL document. This is the name you use to refer to the fragment in an operation or in other fragments. Fragment names can also be useful for server-side logging, much like operation names, so we recommend using explicit and meaningful names. If you name your fragments well, you can track down which part of your code defines that fragment if you want to optimize your data fetching later.

## Type Condition

> GraphQL operations always start at the query, mutation, or subscription type in your schema, but fragments can be used in any selection set. So in order to validate a fragment against your schema in isolation, you need to specify which type it can be used on, and that’s where the type condition comes in.

## Fragment Spread

> When you use a fragment inside an operation or another fragment, you do so by putting ... followed by the fragment name. This is called a fragment spread, and it can appear in any selection set that matches that named fragment’s type condition.

## Inline Fragment

> When you just want to execute some fields depending on the type of a result, but you don’t want to split that out into a separate definition, you can use an inline fragment. This works just like a named fragment, but is written as part of your query. One difference about inline fragments is that they aren’t actually required to have a type condition, and can be used with just a directive, as we’ll see in the example below.

## Directive

> An annotation on a field, fragment, or operation that affects how it is executed or returned.

## Directive Arguments

> These work just like field arguments, but they are handled by the execution engine instead of being passed down to the field resolver.