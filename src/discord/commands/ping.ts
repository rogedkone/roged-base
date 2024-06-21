import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Проверить заведён ли жигуль'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Бр бр бр бр бр бр бр ррррряяяяуууу');
  },
};
