import Base from '@db/base';
import { TPinger } from '../type';

const get = async () => {
  const snapshot = await Base.ref<TPinger>('telegram/pinger').get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const post = async (payload: TPinger) => {
  await Base.ref('telegram/pinger').set(payload);
  return payload;
};

const removeUser = async (login: string) => {
  Base.ref<TPinger>('telegram/pinger').transaction((snapshot) => {
    const pinger = snapshot.val();
    if (pinger === null) return null;

    const { users } = pinger;
    return {
      ...pinger,
      users: users.filter((user) => user !== login),
    };
  });
};

const del = async () => {
  await Base.ref('telegram/pinger').remove();
  return null;
};

export default {
  get,
  post,
  removeUser,
  del,
};
