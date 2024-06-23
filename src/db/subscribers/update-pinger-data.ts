import Base from '@db/base';
import { TPinger } from '@db/telegram/type';
import modulePinger from 'telegram/modules/pinger';
import bot from 'telegram/bot';
import config from '@utils/config';
import DB from '..';

Base.ref<TPinger>('telegram/pinger/data').on('value').subscribe(async (newData) => {
  if (newData.val() === null) return;
  const message = await DB.telegram.pinger.getMessage();

  if (message) {
    bot.api.deleteMessage(config.TG_BOT_CHAT_ID, message.message_id);
  }

  if (newData.val()?.users.length === 0) return;
  modulePinger.subscribers.sendPingerMessage(newData.val() as TPinger);
});
