/* eslint-disable no-restricted-syntax */
import { TMember } from '@db/discord/type';
import DB from '@db/index';
import dayjs from 'dayjs';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const users = [
  { name: 'Егор', value: '859542715972321320' },
  { name: 'Влад', value: '279708254420992011' },
  { name: 'Димас', value: '525391605062959114' },
  { name: 'Ира', value: '487400812570607616' },
  { name: 'Виктор', value: '288258478110146560' },
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
    .addStringOption((option) => option.setName('пользователь5').setDescription('Добавить 5 пользователя').addChoices(users))
    .addStringOption((option) => option.setName('время').setDescription('Время пинга в минутах')),
  async execute(interaction: CommandInteraction) {
    const text = interaction.options.get('текст')?.value as string;
    const time = interaction.options.get('время')?.value as number;
    const userIds = [
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

    const members = Object.values(await DB.discord.members.getAll() as Record<string, TMember>) as TMember[];

    const logins = members.filter(({ id, in_voice }) => userIds.includes(id) && !in_voice).map(({ telegram }) => telegram ?? 'none');

    DB.telegram.pinger.updateData({
      text,
      users: logins,
      start: dayjs().unix(),
      expire: dayjs().add(time ?? 30, 'minutes').unix(),
    });
  },
};
