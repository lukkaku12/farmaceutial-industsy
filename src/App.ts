import express from 'express';
import Routes from './routes/routes.ts';

const server = express();

server.use(express.json());
server.use('/', Routes);

server.listen(3000, () => {
    console.log(`Servidor conectado http://localhost:3000`);
});