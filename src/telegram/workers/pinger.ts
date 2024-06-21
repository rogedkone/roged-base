/* eslint-disable no-restricted-syntax */
import DB from '@db/index';
import { createPinger } from '../utils';

export default async () => {
  const pinger = await DB.discord.pinger.get();

  if (pinger) {
    createPinger(pinger.text, pinger.users);
  }
};
