import DB from '@db/index';
import config from '@utils/config';
import bot from 'telegram/bot';

export default async (newMessage: string) => {
  const oldMessage = await DB.telegram.status.getMessage();

  if (oldMessage) {
    bot.api.editMessageText(
      config.TG_BOT_CHAT_ID,
      oldMessage.message_id,
      newMessage,
      { parse_mode: 'HTML' },
    ).catch(async (err) => {
      if (err.description !== 'Bad Request: message to edit not found') return;

      bot.api.sendMessage(
        config.TG_BOT_CHAT_ID,
        newMessage,
        { parse_mode: 'HTML', message_thread_id: Number(config.TG_BOT_TOPIC_ID) },
      ).then((msg) => {
        DB.telegram.status.updateMessage(msg);
      });
    });
  } else {
    const response = await bot.api.sendMessage(
      config.TG_BOT_CHAT_ID,
      newMessage,
      { parse_mode: 'HTML', message_thread_id: Number(config.TG_BOT_TOPIC_ID) },
    );

    if (response) DB.telegram.status.updateMessage(response);
  }
};
