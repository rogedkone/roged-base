import config from '@utils/config';
import { Socket } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default async (socket: Socket, next: (args?: any) => void) => {
  const user = false;
  const { token } = socket.handshake.auth;
  const { id } = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

  if (!user) {
    console.log('SOCKET:AUTH: Auth Error');
  } else {
    next();
  }
};
