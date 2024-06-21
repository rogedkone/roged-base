/* eslint-disable no-restricted-syntax */
import { MyContext } from 'telegram/bot';
import { pushToDelete } from 'telegram/utils';
import config from '@utils/config';
import { Composer } from 'grammy';
import ApiOpenWeather from './api';
import messages from './messages';

const events = new Composer<MyContext>();
events.on(':location').filter((ctx) => {
  if (ctx.update.message?.is_topic_message) return (ctx.update.message?.message_thread_id ?? '') === Number(config.TG_BOT_TOPIC_ID);
  return false;
}, async (ctx) => {
  ctx.deleteMessage();

  const client = new ApiOpenWeather({ lat: ctx.update.message?.location.latitude ?? 0, lon: ctx.update.message?.location.longitude ?? 0 });

  const forecast = await client.forecast;

  if (forecast) {
    const message = await ctx.api.sendMessage(ctx.chat?.id ?? -1, await messages.forecast(forecast), {
      message_thread_id: ctx.update.message?.message_thread_id,
      parse_mode: 'HTML',
    }).catch((err) => err);

    pushToDelete(message);
  }
});

export default events;
