/* eslint-disable @typescript-eslint/no-shadow */
import Base from '@db/base';
import { TMessage, TMessageIdential } from '../type';

const refPath = 'telegram/deleting';

const messages = async () => {
  const snapshot = await Base.ref<TMessageIdential[]>(refPath).get();
  if (snapshot.exists() && snapshot.val()) return snapshot.val();
  return [];
};

const addMessage = async (payload: (TMessageIdential)) => {
  await Base.ref<Pick<TMessage, 'message_id'> & { chat: { id: number } }[]>(refPath).transaction((snapshot) => {
    if (!snapshot.exists()) return [payload];

    const messages = snapshot.val() ?? [];

    return [...messages, payload];
  });
};

const removeMessage = async (payload: TMessageIdential) => {
  await Base.ref<Pick<TMessage, 'message_id' | 'chat'>[]>(refPath).transaction((snapshot) => {
    if (!snapshot.exists()) return [];

    const messages = snapshot.val() ?? [];

    return messages.filter((msg) => msg.message_id !== payload.message_id && msg.chat.id !== payload.chat.id);
  });
};

export default {
  messages,
  addMessage,
  removeMessage,
};
