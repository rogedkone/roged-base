/* eslint-disable @typescript-eslint/no-shadow */
import Base from '@db/base';
import { TMessageIdential } from '../type';

const refPath = 'telegram/status';

const getText = async () => {
  const snapshot = await Base.ref<string>(`${refPath}/text`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const getMessage = async () => {
  const snapshot = await Base.ref<TMessageIdential>(`${refPath}/message`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const updateMessage = async (payload: TMessageIdential) => {
  await Base.ref<TMessageIdential>(`${refPath}/message`).update(payload);
};

const updateStatus = async (payload: string) => {
  await Base.ref<string>(`${refPath}/text`).transaction((snapshot) => {
    if (snapshot.val() === payload) return snapshot.val();
    if (snapshot.val()) return payload;

    return payload;
  });
};

export default {
  getText,
  updateMessage,
  getMessage,
  updateStatus,
};
