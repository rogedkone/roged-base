/* eslint-disable no-restricted-syntax */
import bot from 'telegram/bot';
import { InlineKeyboard } from 'grammy';
import cities from './utils/cities';

bot.command('weather', (ctx) => {
  ctx.deleteMessage();
  const inlineKeyboard = new InlineKeyboard();
  for (const city of Object.keys(cities)) {
    inlineKeyboard
      .text(city, `openweather:${city}`).row();
  }

  ctx.api.sendMessage(ctx.chat.id, 'Выбери город (либо скинь гео в чат с ботами)', {
    message_thread_id: ctx.update.message?.message_thread_id,
    reply_markup: inlineKeyboard,
  }).catch((err) => err);
});
