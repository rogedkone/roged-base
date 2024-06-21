import dayjs from 'dayjs';
import { TMember } from '@db/discord/type';
import DB from '@db/index';
import { getLastActivity } from 'discord/utils';
import client from '../bot';

export default async () => client.on('presenceUpdate', async (oldPresence, newPresence) => {
  if (newPresence.user?.bot || !newPresence.member) return;

  const { status, clientStatus, activities } = newPresence;

  const update: Partial<TMember> = {
    status,
    devices: clientStatus ?? {},
    activities: activities.map((activity) => ({
      id: activity.applicationId,
      name: activity.name,
      desc: activity.details ?? '',
      state: activity.state ?? '',
      createAt: dayjs(activity.timestamps?.start).unix(),
    })),
    last_seen: await getLastActivity({ id: newPresence.member.id, presence: newPresence }),
  };

  DB.discord.members.updateMember(newPresence.member.id, update);
});
