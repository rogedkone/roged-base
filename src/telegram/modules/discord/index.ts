import DB from '@db/index';
import './subscriber';
import bot from 'telegram/bot';
import config from '@utils/config';
import updateStatusMessage from './utils/updateStatusMessage';

(async () => {
  const doWork = () => {
    updateStatusMessage();
    setTimeout(() => doWork(), 5000);
  };

  const doWork2 = async () => {
    const message = await DB.telegram.messages.discord.message.get();
    bot.api.deleteMessage(config.TG_BOT_CHAT_ID, message?.message_id ?? -1).catch(() => {});
    setTimeout(() => doWork(), 1000 * 60 * 60 * 24);
  };

  doWork();

  doWork2();
})();
