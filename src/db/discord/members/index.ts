import Base from '@db/base';
import { TMember } from '../type';

const getAll = async () => {
  const snapshot = await Base.ref<Record<string, TMember>>('discord/members').get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const getMember = async (id: string) => {
  const snapshot = await Base.ref<TMember>(`discord/members/${id}`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const createMember = async (payload: TMember) => {
  await Base.ref(`discord/members/${payload.id}`).set(payload);
  return payload;
};

const updateMember = async (id: string, payload: Partial<TMember>) => {
  await Base.ref(`discord/members/${id}`).update(payload);
  return payload;
};

const removeMember = async (id: string) => {
  await Base.ref(`discord/members/${id}`).remove();
  return id;
};

export default {
  getAll,
  getMember,
  createMember,
  updateMember,
  removeMember,
};
