/* eslint-disable no-restricted-syntax */
import { TMessage } from '@db/telegram/type';
import DB from '@db/index';
import config from '@utils/config';
import dayjs from 'dayjs';
import { InlineKeyboard } from 'grammy';
import bot from '../bot';

export const pushToDelete = (message: Pick<TMessage, 'message_id'> & { chat: { id: number } }, ms: number = 1000 * 60 * 1) => setTimeout(async () => DB.telegram.messages.toDelete.put(message), ms);

export const removeFromDelete = async (message: Pick<TMessage, 'message_id'> & { chat: { id: number } }) => {
  await DB.telegram.messages.toDelete.del({ message_id: message.message_id, chat: { id: message.chat.id } });
};

export default {
  // editSectionText,
  pushToDelete,
  removeFromDelete,
};
