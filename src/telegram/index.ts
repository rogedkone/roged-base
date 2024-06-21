import { session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import bot from './bot';

import './callback-queries';
// import commands from './commands';
import './workers';
import './modules';
import { addNewActivity } from './conversations';

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.use(createConversation(addNewActivity, 'discord-activity'));

// bot.use(commands.middleware());

bot.api.setMyCommands([
  { command: 'weather', description: 'Меню погоды' },
  { command: 'helldivers', description: 'Статус миссии' },
  { command: 'activity', description: 'Добавить иконки к активности' },
]);

bot.start({
  onStart: () => console.log('BOT:TELEGRAM:STATUS: Started'),
});

bot.catch((err) => console.log('bot error:', err));
