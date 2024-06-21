import { session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import bot from './bot';

import './callback-queries';
import './workers';
import { addNewActivity } from './conversations';
import { moduleHelldivers, moduleOpenWeather } from './modules';
import commands from './commands';

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.use(createConversation(addNewActivity, 'discord-activity'));

bot.use(commands.middleware());
bot.use(moduleOpenWeather.middleware());
bot.use(moduleHelldivers.middleware());

bot.api.setMyCommands([
  { command: 'weather', description: 'Меню погоды' },
  { command: 'helldivers', description: 'Статус миссии' },
  { command: 'activity', description: 'Добавить иконки к активности' },
  { command: 'debug', description: 'Режим разработчика' },
]);

bot.start({
  onStart: () => console.log('BOT:TELEGRAM:STATUS: Started'),
});

bot.catch((err) => console.log('bot error:', err));
