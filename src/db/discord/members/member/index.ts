import Base from '@db/base';
import { TMember } from '../type';

const get = async (id: string) => {
  const snapshot = await Base.ref<Record<string, TMember>>(`discord/members/${id}`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const post = async (payload: TMember) => {
  await Base.ref(`discord/members/${payload.id}`).set(payload);
  return payload;
};

const patch = async (id: string, payload: Partial<TMember>) => {
  const ref = await Base.ref(`discord/members/${id}`).update(payload);

  const snapshot = await ref.get();
  return snapshot.val();
};

const del = async (id: string) => {
  await Base.ref(`discord/members/${id}`).remove();
  return true;
};

export default {
  get,
  post,
  patch,
  del,
};
