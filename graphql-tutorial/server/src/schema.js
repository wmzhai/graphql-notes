import {
  makeExecutableSchema
} from 'graphql-tools';
import { resolvers } from './resolvers';

export const typeDefs = `
  type Channel {
    id: ID!
    name: String
  }
  
  type Query {
    channels: [Channel]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
