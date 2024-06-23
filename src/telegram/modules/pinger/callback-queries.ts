import DB from '@db/index';
import { Composer } from 'grammy';
import { MyContext } from 'telegram/bot';

const queries = new Composer<MyContext>();
queries.callbackQuery('pinger:pop', async (ctx) => {
  const users = (await DB.telegram.pinger.getData())?.users;

  if (users?.includes(ctx.update.callback_query.from.username ?? '')) {
    DB.telegram.pinger.removeUser(ctx.update.callback_query.from.username ?? '');
    ctx.answerCallbackQuery('Окей, удалил тебя');
  } else {
    ctx.answerCallbackQuery('Тебя нету в списке');
  }
});

export default queries;
