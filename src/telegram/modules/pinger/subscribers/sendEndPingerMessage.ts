import { TPinger } from '@db/telegram/type';
import config from '@utils/config';
import bot from 'telegram/bot';

const parseDate = (date: number) => ({
  days: Math.floor(date / 86400),
  hours: Math.floor(date / 3600 % 24),
  minutes: Math.floor(date / 60 % 60),
  seconds: Math.floor(date % 60),
});

export default async (pinger: TPinger) => {
  const times = parseDate(pinger.expire - pinger.start);
  const message = `Эти пидорасы не явились на зов: ${pinger.users.map((login) => `@${login}`).join(' ')}\nИх звали целых: ${times.days ? `${times.days}д ` : ''}${times.hours ? `${times.hours}ч ` : ''}${times.minutes ? `${times.minutes}мин ` : ''}${times.seconds ? `${times.seconds}сек` : ''}`;

  bot.api.sendMessage(
    config.TG_BOT_CHAT_ID,
    message,
    { parse_mode: 'HTML', message_thread_id: Number(config.TG_BOT_TOPIC_ID) },
  );
};
