import DB from '@db/index';
import { createPinger } from 'telegram/utils';
import dayjs from 'dayjs';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const users = [
  { name: 'Егор', value: 'rogedkone' },
  { name: 'Влад', value: 'Mr_Antiz' },
  { name: 'Димас', value: 'PotatoDungeonMaster' },
  { name: 'Ира', value: 'conceptira' },
  { name: 'Виктор', value: 'RyuNoChi' },
];

export default {
  data: new SlashCommandBuilder()
    .setName('ping-tg')
    .setDescription('Начинает пингать людей в телеграмме')
    .addStringOption((option) => option.setName('текст').setDescription('Текст в пинг сообщении').setRequired(true))
    .addStringOption((option) => option.setName('пользователь1').setDescription('Добавить 1 пользователя').setRequired(true).addChoices(users))
    .addStringOption((option) => option.setName('пользователь2').setDescription('Добавить 2 пользователя').addChoices(users))
    .addStringOption((option) => option.setName('пользователь3').setDescription('Добавить 3 пользователя').addChoices(users))
    .addStringOption((option) => option.setName('пользователь4').setDescription('Добавить 4 пользователя').addChoices(users))
    .addStringOption((option) => option.setName('пользователь5').setDescription('Добавить 5 пользователя').addChoices(users)),
  async execute(interaction: CommandInteraction) {
    const text = interaction.options.get('текст')?.value as string;
    const logins = [
      interaction.options.get('пользователь1')?.value,
      interaction.options.get('пользователь2')?.value,
      interaction.options.get('пользователь3')?.value,
      interaction.options.get('пользователь4')?.value,
      interaction.options.get('пользователь5')?.value,
    ].filter((value) => value) as string[];

    const message = await interaction.reply('Начинаю пингать ребятушек');

    setTimeout(() => {
      message.delete();
    }, 1000 * 60 * 1);

    // DB.telegram.pinger
  },
};
