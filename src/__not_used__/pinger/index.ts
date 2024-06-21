import Base from '@db/base';
import { TMessage } from '../../../type';

const get = async () => {
  const snapshot = await Base.ref<TMessage>('telegram/messages/discord/pinger').get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return null;
};

const post = async (payload: (Pick<TMessage, 'message_id'> & { chat: { id: number } })) => {
  await Base.ref<Pick<TMessage, 'message_id'> & { chat: { id: number } }>('telegram/messages/discord/pinger').set(payload);
};

const del = async () => {
  await Base.ref<Pick<TMessage, 'message_id' | 'chat'>[]>('telegram/messages/discord/pinger').remove();
};

export default {
  get,
  post,
  del,
};
