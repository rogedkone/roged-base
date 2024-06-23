import Base from '@db/base';
import { TMessageIdential, TPinger } from '../type';

const refPath = 'telegram/pinger';

const getData = async () => {
  const snapshot = await Base.ref<TPinger>(`${refPath}/data`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};
const updateData = async (payload: TPinger) => {
  await Base.ref(`${refPath}/data`).set(payload);
  return payload;
};

const getMessage = async () => {
  const snapshot = await Base.ref<TMessageIdential>(`${refPath}/message`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const updateMessage = async (payload: TMessageIdential) => {
  await Base.ref<TMessageIdential>(`${refPath}/message`).update(payload);
};

const removeUser = async (login: string) => {
  Base.ref<TPinger>(`${refPath}/data`).transaction((snapshot) => {
    const pinger = snapshot.val();
    if (pinger === null) return null;

    pinger.users = pinger.users.filter((user) => user !== login);

    return pinger;
  });
};

const del = async () => {
  await Base.ref(refPath).remove();
  return null;
};

export default {
  getData,
  getMessage,
  updateMessage,
  updateData,
  removeUser,
  del,
};
