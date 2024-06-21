import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import dayjs from 'dayjs';

export default {
  data: new SlashCommandBuilder()
    .setName('time')
    .setDescription('Текущее время'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(dayjs().format('HH:mm DD.MM.YYYY'));
  },
};
