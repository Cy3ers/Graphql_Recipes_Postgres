import { ApolloClient, InMemoryCache } from '@apollo/client';

const port = process.env.REACT_APP_PORT || 8888;

const client = new ApolloClient({
  uri: `http://localhost:${port}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
