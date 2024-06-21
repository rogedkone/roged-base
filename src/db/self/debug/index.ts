import Base from '@db/base';

const isDebug = async () => {
  const snapshot = await Base.ref<boolean>('self/debug').get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return false;
};

const setDebug = async (payload: boolean) => {
  await Base.ref<boolean>('self/debug').update(payload);
};

export default {
  isDebug,
  setDebug,
};
