/* eslint-disable @typescript-eslint/no-shadow */
import Base from '@db/base';
import { TStatus } from '../type';

const refPath = 'telegram/status';

const status = async () => {
  const snapshot = await Base.ref<TStatus>(refPath).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const createStatus = async (payload: TStatus) => {
  await Base.ref(refPath).set(payload);
};

const updateStatus = async (payload: (Partial<TStatus>)) => {
  await Base.ref<TStatus>(refPath).transaction((snapshot) => {
    if (snapshot.exists() && snapshot.val()) return { ...snapshot.val(), ...payload };

    return payload;
  });
};

export default {
  status,
  createStatus,
  updateStatus,
};
