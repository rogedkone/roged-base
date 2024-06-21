// import DB from '@db/index';
// import config from '@utils/config';
// import bot from 'telegram/bot';
// import dayjs from 'dayjs';
// import { InlineKeyboard } from 'grammy';

// const createPinger = async () => {

// };

// const updatePinger = async (text: string, logins: string[]) => {
//   const pinger = await DB.discord.pinger.get();
//   if (!pinger) return false;
//   const dbMessage = await DB.telegram.messages.discord.pinger.get();
//   if (dayjs().unix() > pinger.expire || (pinger?.users ?? []).length === 0) {
//     await DB.discord.pinger.del();
//     await bot.api.deleteMessage(config.TG_BOT_CHAT_ID, dbMessage?.message_id ?? -1);
//     await DB.telegram.messages.discord.pinger.del();
//     return false;
//   }

//   const inlineKeyboard = new InlineKeyboard().text('Убери меня нахуй отсюда', 'pinger:pop');

//   const msg = `${text} ${logins.join(' ')}\nДействует до: ${dayjs(pinger.expire * 1000).format('HH:mm')}`;

//   if (dbMessage) {
//     bot.api.deleteMessage(config.TG_BOT_CHAT_ID, dbMessage.message_id).then(async () => {
//       const respMessage = await bot.api.sendMessage(config.TG_BOT_CHAT_ID, msg, {
//         parse_mode: 'HTML',
//         reply_markup: inlineKeyboard,
//         message_thread_id: Number(config.TG_BOT_TOPIC_ID),
//       });
//       await DB.telegram.messages.discord.pinger.post(respMessage);
//     }).catch(() => {
//       DB.telegram.messages.discord.pinger.del();
//     });
//   } else {
//     const respMessage = await bot.api.sendMessage(config.TG_BOT_CHAT_ID, msg, {
//       parse_mode: 'HTML',
//       reply_markup: inlineKeyboard,
//       message_thread_id: Number(config.TG_BOT_TOPIC_ID),
//     });
//     await DB.telegram.messages.discord.pinger.post(respMessage);
//   }

//   if (!pinger) return false;
// };

// export default {
//   updatePinger,
//   createPinger,
// };
