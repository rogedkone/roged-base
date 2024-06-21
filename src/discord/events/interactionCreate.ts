import { Events, Interaction } from 'discord.js';
import client from '../bot';
import commands from '../commands';

export default async () => client.on(
  Events.InteractionCreate,
  async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = commands[interaction.commandName];

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    await command.execute(interaction);
  },
);
