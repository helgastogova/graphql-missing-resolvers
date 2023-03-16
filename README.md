# graphql-missing-resolvers

A utility to check for missing resolvers in a GraphQL schema. This package helps you ensure that all fields in your schema have appropriate resolvers.

## Installation

```bash
npm install graphql-missing-resolvers
```

or
```bash
pnpm install graphql-missing-resolvers
```

## Usage

1.  Import the `checkMissingResolvers` function from the graphql-missing-resolvers package:

```typescript
import { checkMissingResolvers } from 'graphql-missing-resolvers';
```

2. Use the `checkMissingResolvers` function with your GraphQL schema:
```typescript
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from './schema';
import { checkMissingResolvers } from 'graphql-missing-resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

checkMissingResolvers(schema);
```
The `checkMissingResolvers` function will analyze your GraphQL schema and log a warning message for each field without a resolver.

## Example
Consider the following schema and resolvers:
```typescript
// schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String!
    user: User!
  }

  type User {
    id: Int!
    name: String!
  }
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    user: () => ({ id: 1, name: 'Alice' }),
  },
  User: {
    id: (user: any) => user.id,
  },
};

```
Import the checkMissingResolvers function and use it with your schema:

```typescript
// index.ts
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from './schema';
import { checkMissingResolvers } from 'graphql-missing-resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

checkMissingResolvers(schema);
```
In this example, the `User.name` field is missing a resolver. When you run your project, the `checkMissingResolvers` function will log a warning message:

```rust
Missing resolver for field: User.name
```
## License
MIT
