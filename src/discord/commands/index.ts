import {
  CommandInteraction, REST, Routes, SlashCommandBuilder,
} from 'discord.js';
import config from '@utils/config';
import ping from './ping';
import time from './time';

type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>; };

const commands = [ping, time];

export const initCommands = async () => {
  const rest = new REST().setToken(config.DC_BOT_TOKEN);

  await rest.put(Routes.applicationGuildCommands(
    config.DC_APP_ID,
    config.DC_GUILD_ID,
  ), { body: commands.map((command) => command.data.toJSON()) });
};

export default commands.reduce((acc, command) => ({ ...acc, [command.data.name]: command }), {}) as Record<string, Command>;
