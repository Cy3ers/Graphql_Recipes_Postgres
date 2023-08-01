import { ApolloClient, InMemoryCache } from '@apollo/client';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;

const client = new ApolloClient({
  uri: `http://localhost:${port}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
