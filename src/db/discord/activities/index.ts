import Base from '@db/base';
import { TActivity } from '../type';

const getAll = async () => {
  const snapshot = await Base.ref<Record<string, Omit<TActivity, 'createAt'>>>('discord/activities').get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const activity = async (id: string) => {
  const snapshot = await Base.ref<Omit<TActivity, 'createAt'>>(`discord/activities/${id}`).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const createActivity = async (payload: Omit<TActivity, 'createAt'>) => {
  await Base.ref(`discord/activities/${payload.id}`).set(payload);
  return payload;
};

const updateActivity = async (id: string, payload: Partial<Omit<TActivity, 'createAt'>>) => {
  const ref = await Base.ref(`discord/activities/${id}`).update(payload);

  const snapshot = await ref.get();
  return snapshot.val();
};

const removeActivity = async (id: string) => {
  await Base.ref(`discord/activities/${id}`).remove();
  return id;
};

export default {
  getAll,
  activity,
  createActivity,
  updateActivity,
  removeActivity,
};
