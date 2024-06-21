import { MyContext } from 'telegram/bot';
import { pushToDelete } from 'telegram/utils';
import { Composer } from 'grammy';
import cities from './utils/cities';
import ApiOpenWeather from './api';
import messages from './messages';

const queries = new Composer<MyContext>();
queries.callbackQuery(Object.keys(cities).map((city) => `openweather:${city}`), async (ctx) => {
  const { data } = ctx.update.callback_query;

  const city = cities[data.split(':')[1]];
  const client = new ApiOpenWeather(city);

  const forecast = await client.forecast.finally(() => {
    ctx.deleteMessage();
    ctx.answerCallbackQuery();
  });

  if (forecast) {
    const message = await ctx.api.sendMessage(ctx.chat?.id ?? -1, await messages.forecast(forecast), {
      message_thread_id: ctx.update.callback_query.message?.message_thread_id,
      parse_mode: 'HTML',
    }).catch((err) => err);

    pushToDelete(message);
  }
});

export default queries;
