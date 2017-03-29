import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

export const typeDefs = `
  type Channel {
    id: ID!
    name: String
  }
  
  type Query {
    channels: [Channel]
  }
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
export { schema };
