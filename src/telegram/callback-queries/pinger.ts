// import DB from '@db/index';
// import bot from '../bot';

// bot.callbackQuery('pinger:pop', async (ctx) => {
//   const pinger = await DB.discord.pinger.get();

//   if (pinger?.users.includes(`@${ctx.update.callback_query.from.username}`)) {
//     DB.discord.pinger.patch(`@${ctx.update.callback_query.from.username}`);
//     ctx.answerCallbackQuery('Окей, удалил тебя');
//   } else {
//     ctx.answerCallbackQuery('Тебя нету в списке');
//   }
// });
