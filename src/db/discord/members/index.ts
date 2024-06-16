import Base from '@db/base';
import { TMember } from './type';
import member from './member';

const get = async () => {
  const snapshot = await Base.ref<Record<string, TMember>>('discord/members').get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

export default {
  get,
  member,
};
