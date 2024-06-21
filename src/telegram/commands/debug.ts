import DB from '@db/index';
import config from '@utils/config';
import { MyContext } from 'telegram/bot';
import { Composer, InlineKeyboard } from 'grammy';

const debug = new Composer<MyContext>();
debug.command('debug', async (ctx) => {
  ctx.deleteMessage();
  const isDebug = await DB.self.debug.isDebug();

  const inlineKeyboard = new InlineKeyboard().text(isDebug ? 'Выключить' : 'Включить', `debug:${isDebug ? 'off' : 'on'}`);

  ctx.api.sendMessage(config.TG_BOT_CHAT_ID, `Режим разработчика ${isDebug ? '🟢' : '🔴'}`, {
    message_thread_id: Number(config.TG_BOT_TOPIC_ID),
    reply_markup: inlineKeyboard,
  });
});

export default debug;
