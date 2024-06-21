import { Composer } from 'grammy';
import { MyContext } from '../bot';

const activity = new Composer<MyContext>();
activity.command('activity').filter((ctx) => ctx.chat.type === 'private', async (ctx) => {
  ctx.deleteMessage();
  await ctx.conversation.enter('discord-activity');
});

export default activity;
