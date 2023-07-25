import dotenv from 'dotenv';
import sequelize from './backend/sequelizer/sequelizeinit.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './backend/server/server.js';

dotenv.config();

sequelize
  .authenticate()
  .then(() => {
    console.log(`PostgreSQL Connected.`);
  })
  .catch((err) => console.log(err));

const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 8080;
const { url } = await startStandaloneServer(server, { listen: { port } });

console.log(`Server ready at port: ${port}`);
