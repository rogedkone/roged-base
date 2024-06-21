import io from './client';
import { auth } from './middleware';

io.use(auth);

io.on('connection', (client) => {
  console.log(`SOCKET:STATUS: Client ${client.id} connected`);
  client.on('event', (data) => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});

io.on('discord/members:update', (data) => {
  console.log('test', data);
});

io.listen(3001);

export default io;
