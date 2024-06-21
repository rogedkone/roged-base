import { Events } from 'discord.js';
import constants from '@utils/config';

import client from './bot';
import { initCommands } from './commands';
import initEvents from './events';

client.once(Events.ClientReady, (readyClient) => {
  console.log(`BOT:DISCORD:STATUS: Ready as ${readyClient.user.tag}`);

  initCommands();
  initEvents();
});

client.login(constants.DC_BOT_TOKEN);
