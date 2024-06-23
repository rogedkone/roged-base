import DB from '@db/index';
import { TPinger } from '@db/telegram/type';
import config from '@utils/config';
import dayjs from 'dayjs';
import { InlineKeyboard } from 'grammy';
import bot from 'telegram/bot';

export default async (pinger: TPinger) => {
  const inlineKeyboard = new InlineKeyboard().text('Убери меня нахуй отсюда', 'pinger:pop');

  bot.api.sendMessage(
    config.TG_BOT_CHAT_ID,
    `${pinger.text} ${pinger.users.map((login) => `@${login}`).join(' ')}\nДействует до: ${dayjs(pinger.expire * 1000).format('HH:mm')}`,
    { parse_mode: 'HTML', message_thread_id: Number(config.TG_BOT_TOPIC_ID), reply_markup: inlineKeyboard },
  ).then((msg) => {
    DB.telegram.pinger.updateMessage(msg);
  });
};
