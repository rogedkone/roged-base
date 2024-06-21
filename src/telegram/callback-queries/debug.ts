import DB from '@db/index';
import bot from '../bot';

bot.callbackQuery(['debug:on', 'debug:off'], async (ctx) => {
  ctx.deleteMessage();
  const { data } = ctx.update.callback_query;
  const isDebug = data === 'debug:on';

  DB.self.debug.setDebug(isDebug).then(() => {
    ctx.answerCallbackQuery();
  });
});
