/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import config from '@utils/config';
import { TMember } from '@db/discord/type';
import DB from '@db/index';
import dayjs from 'dayjs';
import { getLastActivity, getTelegram } from 'discord/utils';
import client from '../bot';

export default async () => {
  const guild = await client.guilds.fetch(config.DC_GUILD_ID);
  if (!guild) return;

  const members = await guild.members.fetch({ withPresences: true })
    .then((data) => data.filter(({ user: { bot } }) => !bot))
    .catch(() => {
      console.log('BOT:DISCORD:ERROR: cant fetch members from guild');
      return null;
    });

  if (!members) return;

  for (const member of members) {
    const info = member[1];
    const {
      user: {
        username, discriminator, globalName, id,
      }, presence,
    } = info;

    const update: Partial<TMember> = {
      id,
      username: username ?? discriminator + globalName,
      nickname: globalName ?? 'Кто-это?',
      status: presence?.status ?? 'offline',
      devices: presence?.clientStatus ?? {},
      activities: (presence?.activities ?? []).map((activity) => ({
        id: activity.applicationId,
        name: activity.name,
        desc: activity.details ?? '',
        state: activity.state ?? '',
        createAt: dayjs(activity.timestamps?.start).unix(),
      })),
      last_seen: await getLastActivity({ id, presence }),
      telegram: getTelegram(id),
    };

    DB.discord.members.updateMember(id, update);
  }
};
