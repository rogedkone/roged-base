import { Server } from 'socket.io';

const server = require('http').createServer();

const io = new Server(server);

export default io;
