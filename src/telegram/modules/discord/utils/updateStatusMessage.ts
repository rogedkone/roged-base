import { TMember } from '@db/discord/type';
import DB from '@db/index';
import config from '@utils/config';
import bot from 'telegram/bot';
import Base from '@db/base';
import { generateStatus } from '.';

export default async () => {
  const members = (await Base.ref<Record<string, TMember>>('discord/members').get()).val();
  if (members === null) return;

  const tgMessage = await DB.telegram.messages.discord.message.get();

  const oldStatus = await DB.telegram.messages.discord.lastStatus.get();
  const newStatus = await generateStatus(Object.values(members).sort((a, b) => {
    if (a.nickname && b.nickname) return a.nickname.localeCompare(b.nickname);
    if (a.username && b.username) return a.username.localeCompare(b.username);
    if (a.custom_name && b.custom_name) return a.custom_name.localeCompare(b.custom_name);
    return 1;
  }));

  if (oldStatus === newStatus) return;

  if (tgMessage) {
    bot.api.editMessageText(config.TG_BOT_CHAT_ID, tgMessage.message_id, newStatus, { parse_mode: 'HTML' })
      .then(() => {
        DB.telegram.messages.discord.lastStatus.post(newStatus);
      })
      .catch(async (err) => {
        console.log('ERROR:', err);
        if (err.description === 'Bad Request: message to edit not found') {
          const message = await bot.api.sendMessage(config.TG_BOT_CHAT_ID, newStatus, {
            message_thread_id: Number(config.TG_BOT_TOPIC_ID),
            parse_mode: 'HTML',
          });

          DB.telegram.messages.discord.message.post(message);
          DB.telegram.messages.discord.lastStatus.post(newStatus);
        }
      });
  } else {
    const message = await bot.api.sendMessage(config.TG_BOT_CHAT_ID, newStatus, {
      parse_mode: 'HTML',
      message_thread_id: Number(config.TG_BOT_TOPIC_ID),
    }).catch(() => null);

    if (message) DB.telegram.messages.discord.message.post(message);
  }
};
