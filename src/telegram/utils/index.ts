/* eslint-disable no-restricted-syntax */
import { TMessageIdential } from '@db/telegram/type';
import DB from '@db/index';

export const pushToDelete = (message: TMessageIdential, ms: number = 1000 * 60 * 1) => setTimeout(async () => DB.telegram.deleting.addMessage(message), ms);

export const removeFromDelete = async (message: TMessageIdential) => {
  await DB.telegram.deleting.removeMessage(message);
};

export default {
  pushToDelete,
  removeFromDelete,
};
