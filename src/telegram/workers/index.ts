import moduleDiscord from 'telegram/modules/discord';
import modulePinger from 'telegram/modules/pinger';
import DB from '@db/index';
import dayjs from 'dayjs';
import bot from 'telegram/bot';
import config from '@utils/config';
import clearMessages from './clearMessages';

(async () => {
  const doWork = async () => {
    clearMessages();
    moduleDiscord.subscribers.updateStatusMessage();

    setTimeout(() => doWork(), 5000);
  };

  const doWork2 = async () => {
    const pinger = await DB.telegram.pinger.getData();
    const message = await DB.telegram.pinger.getMessage();

    if (message) {
      bot.api.deleteMessage(config.TG_BOT_CHAT_ID, message.message_id).then(() => {
        if (pinger) {
          if ((pinger?.expire ?? -1) < dayjs().unix()) {
            DB.telegram.pinger.del();
            if (pinger.users.length !== 0) modulePinger.subscribers.sendEndPingerMessage(pinger);
          } else {
            modulePinger.subscribers.sendPingerMessage(pinger);
          }
        }
      }).catch((err) => {
        if (pinger && err.description === 'Bad Request: message to delete not found') {
          if ((pinger?.expire ?? -1) < dayjs().unix() || pinger.users.length === 0) {
            DB.telegram.pinger.del();
            if (pinger.users.length !== 0) modulePinger.subscribers.sendEndPingerMessage(pinger);
          } else {
            modulePinger.subscribers.sendPingerMessage(pinger);
          }
        }
      });
    }

    setTimeout(() => doWork2(), 60000);
  };

  const doWork3 = async () => {
    const message = await DB.telegram.status.getMessage();
    if (message) {
      bot.api.deleteMessage(config.TG_BOT_CHAT_ID, message.message_id);
    }
    setTimeout(() => doWork3(), 1000 * 60 * 60);
  };

  doWork();
  doWork2();
  doWork3();
})();
