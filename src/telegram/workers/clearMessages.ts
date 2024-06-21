/* eslint-disable no-restricted-syntax */
import DB from '@db/index';
import bot from '../bot';
import { removeFromDelete } from '../utils';

export default async () => {
  const messages = await DB.telegram.deleting.messages();
  if (!messages || (messages && messages.length === 0)) return;

  for (const msg of messages) {
    bot.api.deleteMessage(msg.chat.id, msg.message_id)
      .then(() => {
        removeFromDelete(msg);
      })
      .catch((err) => {
        console.log(err.description);
        if (err.description === 'Bad Request: message to delete not found') {
          removeFromDelete(msg);
        }
      });
  }
};
